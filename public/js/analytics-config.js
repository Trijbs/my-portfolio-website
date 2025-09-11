/**
 * Analytics Configuration
 * Basic configuration for portfolio analytics
 */

window.analyticsConfig = {
    enabled: true,
    endpoint: '/api/analytics',
    trackPageViews: true,
    trackClicks: true,
    trackFormSubmissions: true,
    debug: false
};

// Simple analytics tracking function
window.track = function(event, data = {}) {
    if (!window.analyticsConfig.enabled) return;
    
    const payload = {
        event,
        data,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    if (window.analyticsConfig.debug) {
        console.log('Analytics:', payload);
    }
    
    // Send to analytics endpoint
    fetch(window.analyticsConfig.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).catch(error => {
        if (window.analyticsConfig.debug) {
            console.error('Analytics error:', error);
        }
    });
};

// Track page view on load
document.addEventListener('DOMContentLoaded', () => {
    if (window.analyticsConfig.trackPageViews) {
        window.track('page_view', {
            title: document.title,
            path: window.location.pathname
        });
    }
});