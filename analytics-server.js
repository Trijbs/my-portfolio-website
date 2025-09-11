/**
 * Analytics Server - Node.js/Express Backend
 * Handles analytics data collection and storage
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Data storage (in production, use a proper database)
const DATA_DIR = './analytics-data';
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// Initialize data files
async function initializeDataFiles() {
    const files = [EVENTS_FILE, SESSIONS_FILE, USERS_FILE];
    
    for (const file of files) {
        try {
            await fs.access(file);
        } catch {
            await fs.writeFile(file, JSON.stringify([]));
        }
    }
}

// Utility functions
async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeJsonFile(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

async function appendToJsonFile(filePath, newData) {
    const existingData = await readJsonFile(filePath);
    existingData.push(newData);
    
    // Keep only last 10000 events to prevent file from growing too large
    if (existingData.length > 10000) {
        existingData.splice(0, existingData.length - 10000);
    }
    
    await writeJsonFile(filePath, existingData);
}

// Analytics endpoints
app.post('/api/analytics', async (req, res) => {
    try {
        const event = {
            ...req.body,
            id: uuidv4(),
            serverTimestamp: Date.now(),
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent'),
            origin: req.get('Origin')
        };

        // Store event
        await appendToJsonFile(EVENTS_FILE, event);

        // Update session data
        await updateSessionData(event);

        // Update user data
        await updateUserData(event);

        res.json({ success: true, eventId: event.id });
    } catch (error) {
        console.error('Error storing analytics event:', error);
        res.status(500).json({ error: 'Failed to store event' });
    }
});

// Get analytics data
app.get('/api/analytics/events', async (req, res) => {
    try {
        const { limit = 1000, offset = 0, type, sessionId, userId, startTime, endTime } = req.query;
        
        let events = await readJsonFile(EVENTS_FILE);
        
        // Apply filters
        if (type) {
            events = events.filter(e => e.eventType === type);
        }
        
        if (sessionId) {
            events = events.filter(e => e.sessionId === sessionId);
        }
        
        if (userId) {
            events = events.filter(e => e.userId === userId);
        }
        
        if (startTime) {
            events = events.filter(e => e.timestamp >= parseInt(startTime));
        }
        
        if (endTime) {
            events = events.filter(e => e.timestamp <= parseInt(endTime));
        }
        
        // Apply pagination
        const paginatedEvents = events.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
        
        res.json({
            events: paginatedEvents,
            total: events.length,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (error) {
        console.error('Error retrieving events:', error);
        res.status(500).json({ error: 'Failed to retrieve events' });
    }
});

// Get session data
app.get('/api/analytics/sessions', async (req, res) => {
    try {
        const sessions = await readJsonFile(SESSIONS_FILE);
        res.json(sessions);
    } catch (error) {
        console.error('Error retrieving sessions:', error);
        res.status(500).json({ error: 'Failed to retrieve sessions' });
    }
});

// Get user data
app.get('/api/analytics/users', async (req, res) => {
    try {
        const users = await readJsonFile(USERS_FILE);
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

// Get analytics summary
app.get('/api/analytics/summary', async (req, res) => {
    try {
        const events = await readJsonFile(EVENTS_FILE);
        const sessions = await readJsonFile(SESSIONS_FILE);
        const users = await readJsonFile(USERS_FILE);
        
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        const oneDay = 24 * oneHour;
        const oneWeek = 7 * oneDay;
        
        // Calculate metrics
        const recentEvents = events.filter(e => now - e.timestamp < oneHour);
        const todayEvents = events.filter(e => now - e.timestamp < oneDay);
        const weekEvents = events.filter(e => now - e.timestamp < oneWeek);
        
        const activeSessions = new Set(recentEvents.map(e => e.sessionId)).size;
        const pageViews = events.filter(e => e.eventType === 'page_load').length;
        const uniqueUsers = new Set(events.map(e => e.userId)).size;
        
        // Device breakdown
        const deviceEvents = events.filter(e => e.deviceInfo);
        let desktop = 0, mobile = 0, tablet = 0;
        
        deviceEvents.forEach(event => {
            const width = event.deviceInfo?.windowWidth || 0;
            if (width >= 1024) desktop++;
            else if (width >= 768) tablet++;
            else mobile++;
        });
        
        // Browser breakdown
        const browsers = {};
        events.forEach(event => {
            if (event.browser?.name) {
                browsers[event.browser.name] = (browsers[event.browser.name] || 0) + 1;
            }
        });
        
        // Top pages
        const pages = {};
        events.filter(e => e.eventType === 'page_load').forEach(event => {
            const url = new URL(event.url).pathname;
            pages[url] = (pages[url] || 0) + 1;
        });
        
        const summary = {
            overview: {
                totalEvents: events.length,
                activeSessions,
                pageViews,
                uniqueUsers,
                eventsToday: todayEvents.length,
                eventsThisWeek: weekEvents.length
            },
            devices: {
                desktop,
                mobile,
                tablet
            },
            browsers,
            topPages: Object.entries(pages)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10)
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
            timeRanges: {
                lastHour: recentEvents.length,
                lastDay: todayEvents.length,
                lastWeek: weekEvents.length
            }
        };
        
        res.json(summary);
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).json({ error: 'Failed to generate summary' });
    }
});

// Real-time events endpoint (Server-Sent Events)
app.get('/api/analytics/stream', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
    });

    // Send initial connection message
    res.write('data: {"type": "connected", "timestamp": ' + Date.now() + '}\n\n');

    // Store client connection
    const clientId = uuidv4();
    clients.set(clientId, res);

    // Clean up on client disconnect
    req.on('close', () => {
        clients.delete(clientId);
    });
});

// Store active SSE connections
const clients = new Map();

// Broadcast new events to connected clients
function broadcastEvent(event) {
    const message = `data: ${JSON.stringify(event)}\n\n`;
    clients.forEach(client => {
        try {
            client.write(message);
        } catch (error) {
            console.error('Error broadcasting to client:', error);
        }
    });
}

// Update session data
async function updateSessionData(event) {
    const sessions = await readJsonFile(SESSIONS_FILE);
    
    let session = sessions.find(s => s.sessionId === event.sessionId);
    
    if (!session) {
        session = {
            sessionId: event.sessionId,
            userId: event.userId,
            startTime: event.timestamp,
            lastActivity: event.timestamp,
            events: 0,
            pageViews: 0,
            deviceInfo: event.deviceInfo,
            ip: event.ip,
            userAgent: event.userAgent
        };
        sessions.push(session);
    }
    
    session.lastActivity = event.timestamp;
    session.events++;
    
    if (event.eventType === 'page_load') {
        session.pageViews++;
    }
    
    await writeJsonFile(SESSIONS_FILE, sessions);
}

// Update user data
async function updateUserData(event) {
    const users = await readJsonFile(USERS_FILE);
    
    let user = users.find(u => u.userId === event.userId);
    
    if (!user) {
        user = {
            userId: event.userId,
            firstSeen: event.timestamp,
            lastSeen: event.timestamp,
            sessions: new Set([event.sessionId]),
            totalEvents: 0,
            pageViews: 0,
            deviceInfo: event.deviceInfo
        };
        users.push(user);
    }
    
    user.lastSeen = event.timestamp;
    user.sessions.add(event.sessionId);
    user.totalEvents++;
    
    if (event.eventType === 'page_load') {
        user.pageViews++;
    }
    
    // Convert Set to Array for JSON serialization
    user.sessions = Array.from(user.sessions);
    
    await writeJsonFile(USERS_FILE, users);
}

// Modify the analytics endpoint to broadcast events
app.post('/api/analytics', async (req, res) => {
    try {
        const event = {
            ...req.body,
            id: uuidv4(),
            serverTimestamp: Date.now(),
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent'),
            origin: req.get('Origin')
        };

        // Store event
        await appendToJsonFile(EVENTS_FILE, event);

        // Update session and user data
        await updateSessionData(event);
        await updateUserData(event);

        // Broadcast to connected clients
        broadcastEvent(event);

        res.json({ success: true, eventId: event.id });
    } catch (error) {
        console.error('Error storing analytics event:', error);
        res.status(500).json({ error: 'Failed to store event' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: Date.now(),
        connectedClients: clients.size
    });
});

// Serve analytics dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'analytics-dashboard.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Initialize and start server
async function startServer() {
    try {
        await ensureDataDir();
        await initializeDataFiles();
        
        app.listen(PORT, () => {
            console.log(`Analytics server running on port ${PORT}`);
            console.log(`Dashboard available at http://localhost:${PORT}/dashboard`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;