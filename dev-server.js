/**
 * Simple development server for testing locally
 * Run with: node dev-server.js
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Simulate Netlify functions locally
app.post('/.netlify/functions/contact', async (req, res) => {
    try {
        // Import and run the contact function
        const { handler } = require('./netlify/functions/contact');
        
        const event = {
            httpMethod: 'POST',
            body: JSON.stringify(req.body),
            headers: req.headers,
            path: '/.netlify/functions/contact'
        };
        
        const result = await handler(event, {});
        
        res.status(result.statusCode).json(JSON.parse(result.body));
    } catch (error) {
        console.error('Contact function error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/.netlify/functions/analytics', async (req, res) => {
    try {
        // Import and run the analytics function
        const { handler } = require('./netlify/functions/analytics');
        
        const event = {
            httpMethod: 'POST',
            body: JSON.stringify(req.body),
            headers: req.headers,
            path: '/.netlify/functions/analytics'
        };
        
        const result = await handler(event, {});
        
        res.status(result.statusCode).json(JSON.parse(result.body));
    } catch (error) {
        console.error('Analytics function error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Serve index.html for all routes (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Development server running at http://localhost:${PORT}`);
    console.log(`📧 Contact form: http://localhost:${PORT}/.netlify/functions/contact`);
    console.log(`📊 Analytics: http://localhost:${PORT}/.netlify/functions/analytics`);
    console.log(`\n💡 For full Netlify simulation, use: netlify dev`);
});