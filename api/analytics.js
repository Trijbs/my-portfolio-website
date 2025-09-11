/**
 * Vercel Serverless Function for Analytics
 * Handles analytics data collection and storage
 */

// In-memory storage for demo (use a database in production)
let analyticsData = [];
let sessions = new Map();
let users = new Map();

// Rate limiting storage
const rateLimitStore = new Map();

// Clean up old rate limit entries
const cleanupRateLimit = () => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    for (const [key, data] of rateLimitStore.entries()) {
        if (now - data.firstAttempt > oneHour) {
            rateLimitStore.delete(key);
        }
    }
};

// Check rate limit (more lenient for analytics)
const checkRateLimit = (ip) => {
    cleanupRateLimit();
    
    const key = ip;
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    if (!rateLimitStore.has(key)) {
        rateLimitStore.set(key, {
            count: 1,
            firstAttempt: now
        });
        return true;
    }
    
    const data = rateLimitStore.get(key);
    
    // Reset if more than 1 hour has passed
    if (now - data.firstAttempt > oneHour) {
        rateLimitStore.set(key, {
            count: 1,
            firstAttempt: now
        });
        return true;
    }
    
    // Allow up to 1000 requests per hour for analytics
    if (data.count < 1000) {
        data.count++;
        return true;
    }
    
    return false;
};

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Update session data
const updateSession = (sessionId, eventData) => {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, {
            id: sessionId,
            userId: eventData.userId,
            startTime: eventData.timestamp,
            lastActivity: eventData.timestamp,
            events: [],
            pageViews: 0,
            duration: 0
        });
    }
    
    const session = sessions.get(sessionId);
    session.lastActivity = eventData.timestamp;
    session.duration = eventData.timestamp - session.startTime;
    session.events.push(eventData);
    
    if (eventData.eventType === 'page_load') {
        session.pageViews++;
    }
};

// Update user data
const updateUser = (userId, eventData) => {
    if (!users.has(userId)) {
        users.set(userId, {
            id: userId,
            firstSeen: eventData.timestamp,
            lastSeen: eventData.timestamp,
            sessions: new Set(),
            totalEvents: 0,
            deviceInfo: eventData.deviceInfo || {}
        });
    }
    
    const user = users.get(userId);
    user.lastSeen = eventData.timestamp;
    user.sessions.add(eventData.sessionId);
    user.totalEvents++;
    
    if (eventData.deviceInfo) {
        user.deviceInfo = { ...user.deviceInfo, ...eventData.deviceInfo };
    }
};

// Main handler function for Vercel
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Get client IP for rate limiting
        const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';

        // Check rate limit
        if (!checkRateLimit(clientIP)) {
            return res.status(429).json({
                success: false,
                message: 'Rate limit exceeded'
            });
        }

        // Handle different methods
        if (req.method === 'POST') {
            // Store analytics event
            const eventData = req.body;
            
            // Add server-side data
            eventData.id = eventData.id || generateId();
            eventData.serverTimestamp = Date.now();
            eventData.ip = clientIP;
            
            // Store event
            analyticsData.push(eventData);
            
            // Update session and user data
            if (eventData.sessionId) {
                updateSession(eventData.sessionId, eventData);
            }
            if (eventData.userId) {
                updateUser(eventData.userId, eventData);
            }
            
            // Keep only last 10000 events to prevent memory issues
            if (analyticsData.length > 10000) {
                analyticsData = analyticsData.slice(-10000);
            }
            
            return res.status(200).json({
                success: true,
                message: 'Event stored successfully'
            });
        }
        
        else if (req.method === 'GET') {
            const { action } = req.query;
            
            if (action === 'events') {
                // Get analytics events
                const limit = parseInt(req.query.limit) || 100;
                const offset = parseInt(req.query.offset) || 0;
                
                const events = analyticsData
                    .slice(-limit - offset, -offset || undefined)
                    .reverse();
                
                return res.status(200).json({
                    success: true,
                    events,
                    total: analyticsData.length
                });
            }
            
            else if (action === 'summary') {
                // Get analytics summary
                const now = Date.now();
                const oneDayAgo = now - (24 * 60 * 60 * 1000);
                const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
                
                const todayEvents = analyticsData.filter(e => e.timestamp > oneDayAgo);
                const weekEvents = analyticsData.filter(e => e.timestamp > oneWeekAgo);
                
                const summary = {
                    totalEvents: analyticsData.length,
                    todayEvents: todayEvents.length,
                    weekEvents: weekEvents.length,
                    totalSessions: sessions.size,
                    totalUsers: users.size,
                    avgSessionDuration: Array.from(sessions.values())
                        .reduce((sum, s) => sum + s.duration, 0) / sessions.size || 0,
                    topEvents: analyticsData
                        .reduce((acc, event) => {
                            acc[event.eventType] = (acc[event.eventType] || 0) + 1;
                            return acc;
                        }, {}),
                    recentEvents: analyticsData.slice(-10).reverse()
                };
                
                return res.status(200).json({
                    success: true,
                    summary
                });
            }
            
            else if (action === 'health') {
                // Health check
                return res.status(200).json({
                    status: 'healthy',
                    timestamp: new Date().toISOString(),
                    service: 'analytics-vercel',
                    eventsStored: analyticsData.length,
                    sessionsActive: sessions.size,
                    usersTracked: users.size
                });
            }
            
            else {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid action parameter'
                });
            }
        }
        
        else {
            return res.status(405).json({
                success: false,
                message: 'Method not allowed'
            });
        }

    } catch (error) {
        console.error('Analytics function error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}