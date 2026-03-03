import { isAnalyticsAuthConfigured, isAnalyticsAuthorized } from './_lib/analytics-auth.js';
import {
    appendAnalyticsEvent,
    countAnalyticsEvents,
    getAnalyticsStorageMode,
    readAllAnalyticsEvents,
    readAnalyticsEvents
} from './_lib/analytics-store.js';

const rateLimitStore = new Map();

function cleanupRateLimit() {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    for (const [key, data] of rateLimitStore.entries()) {
        if (now - data.firstAttempt > oneHour) {
            rateLimitStore.delete(key);
        }
    }
}

function checkRateLimit(ip) {
    cleanupRateLimit();

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const key = ip;

    if (!rateLimitStore.has(key)) {
        rateLimitStore.set(key, { count: 1, firstAttempt: now });
        return true;
    }

    const entry = rateLimitStore.get(key);

    if (now - entry.firstAttempt > oneHour) {
        rateLimitStore.set(key, { count: 1, firstAttempt: now });
        return true;
    }

    if (entry.count < 1000) {
        entry.count += 1;
        return true;
    }

    return false;
}

function generateId() {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
}

function summarizeTopCounts(events, key) {
    return events.reduce((accumulator, event) => {
        const value = event[key];
        if (!value) {
            return accumulator;
        }

        accumulator[value] = (accumulator[value] || 0) + 1;
        return accumulator;
    }, {});
}

function buildSessionMap(events) {
    const sessions = new Map();

    events.forEach((event) => {
        if (!event.sessionId) {
            return;
        }

        if (!sessions.has(event.sessionId)) {
            sessions.set(event.sessionId, {
                id: event.sessionId,
                userId: event.userId || null,
                startTime: event.timestamp,
                lastActivity: event.timestamp,
                pageViews: 0
            });
        }

        const session = sessions.get(event.sessionId);
        session.lastActivity = Math.max(session.lastActivity, event.timestamp);
        session.startTime = Math.min(session.startTime, event.timestamp);

        if (event.eventType === 'page_load') {
            session.pageViews += 1;
        }
    });

    return sessions;
}

function buildUserMap(events) {
    const users = new Map();

    events.forEach((event) => {
        if (!event.userId) {
            return;
        }

        if (!users.has(event.userId)) {
            users.set(event.userId, {
                id: event.userId,
                firstSeen: event.timestamp,
                lastSeen: event.timestamp
            });
        }

        const user = users.get(event.userId);
        user.firstSeen = Math.min(user.firstSeen, event.timestamp);
        user.lastSeen = Math.max(user.lastSeen, event.timestamp);
    });

    return users;
}

function getClientIp(req) {
    const forwardedFor = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    return String(forwardedFor).split(',')[0].trim();
}

function requireAnalyticsAuth(req, res) {
    if (!isAnalyticsAuthConfigured()) {
        res.status(503).json({
            success: false,
            message: 'Analytics admin password is not configured.'
        });
        return false;
    }

    if (!isAnalyticsAuthorized(req)) {
        res.status(401).json({
            success: false,
            message: 'Analytics authentication required.'
        });
        return false;
    }

    return true;
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const clientIp = getClientIp(req);

        if (!checkRateLimit(clientIp)) {
            return res.status(429).json({
                success: false,
                message: 'Rate limit exceeded'
            });
        }

        if (req.method === 'POST') {
            const eventData = {
                ...(req.body || {}),
                id: req.body?.id || generateId(),
                serverTimestamp: Date.now(),
                ip: clientIp
            };

            await appendAnalyticsEvent(eventData);

            return res.status(200).json({
                success: true,
                message: 'Event stored successfully'
            });
        }

        if (req.method !== 'GET') {
            return res.status(405).json({
                success: false,
                message: 'Method not allowed'
            });
        }

        if (!requireAnalyticsAuth(req, res)) {
            return;
        }

        const action = req.query?.action;

        if (action === 'events') {
            const limit = Math.max(1, Math.min(500, parseInt(req.query?.limit, 10) || 100));
            const offset = Math.max(0, parseInt(req.query?.offset, 10) || 0);
            const [events, total] = await Promise.all([
                readAnalyticsEvents(limit, offset),
                countAnalyticsEvents()
            ]);

            return res.status(200).json({
                success: true,
                events,
                total
            });
        }

        const events = await readAllAnalyticsEvents();
        const sessions = buildSessionMap(events);
        const users = buildUserMap(events);

        if (action === 'summary') {
            const now = Date.now();
            const oneDayAgo = now - (24 * 60 * 60 * 1000);
            const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
            const todayEvents = events.filter((event) => event.timestamp > oneDayAgo);
            const weekEvents = events.filter((event) => event.timestamp > oneWeekAgo);
            const avgSessionDuration = sessions.size
                ? Array.from(sessions.values()).reduce(
                    (sum, session) => sum + (session.lastActivity - session.startTime),
                    0
                ) / sessions.size
                : 0;

            return res.status(200).json({
                success: true,
                summary: {
                    totalEvents: events.length,
                    todayEvents: todayEvents.length,
                    weekEvents: weekEvents.length,
                    totalSessions: sessions.size,
                    totalUsers: users.size,
                    avgSessionDuration,
                    topEvents: summarizeTopCounts(events, 'eventType'),
                    topPages: summarizeTopCounts(events, 'path'),
                    recentEvents: events.slice(0, 10)
                }
            });
        }

        if (action === 'health') {
            return res.status(200).json({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                service: 'analytics-vercel',
                eventsStored: events.length,
                sessionsActive: sessions.size,
                usersTracked: users.size,
                storage: getAnalyticsStorageMode(),
                persistent: getAnalyticsStorageMode() === 'upstash-redis'
            });
        }

        return res.status(400).json({
            success: false,
            message: 'Invalid action parameter'
        });
    } catch (error) {
        console.error('Analytics function error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
