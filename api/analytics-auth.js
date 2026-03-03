import {
    clearAnalyticsAuthCookie,
    isAnalyticsAuthConfigured,
    isAnalyticsAuthorized,
    setAnalyticsAuthCookie,
    validateAnalyticsPassword
} from './_lib/analytics-auth.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        return res.status(200).json({
            success: true,
            configured: isAnalyticsAuthConfigured(),
            authenticated: isAnalyticsAuthorized(req)
        });
    }

    if (req.method === 'DELETE') {
        clearAnalyticsAuthCookie(res);
        return res.status(200).json({
            success: true,
            authenticated: false
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    if (!isAnalyticsAuthConfigured()) {
        return res.status(503).json({
            success: false,
            message: 'Analytics admin password is not configured.'
        });
    }

    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!validateAnalyticsPassword(password)) {
        clearAnalyticsAuthCookie(res);
        return res.status(401).json({
            success: false,
            message: 'Invalid password.'
        });
    }

    setAnalyticsAuthCookie(res);

    return res.status(200).json({
        success: true,
        authenticated: true
    });
}
