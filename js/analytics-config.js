/**
 * Analytics Configuration
 * Customize tracking behavior and settings
 */

window.ANALYTICS_CONFIG = {
    // Server Configuration
    server: {
        enabled: true, // Enable Vercel serverless functions
        endpoint: '/api/analytics', // Vercel serverless function endpoint
        timeout: 5000
    },

    // Tracking Features
    tracking: {
        pageViews: true,
        clicks: true,
        scrolling: true,
        mouseMovement: true,
        touchEvents: true,
        formInteractions: true,
        keyboardActivity: true,
        performance: true,
        errors: true,
        networkStatus: true,
        deviceInfo: true,
        userAgent: true
    },

    // Privacy Settings
    privacy: {
        showConsentBanner: true,
        requireConsent: true,
        defaultConsent: false,
        consentExpiry: 365, // days
        showPrivacyControls: true
    },

    // Data Storage
    storage: {
        maxEvents: 1000, // Maximum events to store locally
        maxAge: 30, // Days to keep data
        compression: false // Enable data compression (future feature)
    },

    // Dashboard Settings
    dashboard: {
        theme: 'dark', // 'dark' or 'light'
        refreshInterval: 1000, // milliseconds
        maxLiveEvents: 50,
        chartAnimations: true
    },

    // Custom Event Categories
    eventCategories: {
        navigation: ['page_load', 'navigation_click', 'scroll_milestone'],
        interaction: ['click', 'form_focus', 'form_submit'],
        performance: ['performance_timing', 'resource_load', 'javascript_error'],
        engagement: ['mouse_movement', 'keyboard_activity', 'heartbeat']
    },

    // Notification Settings
    notifications: {
        enabled: true,
        position: 'top-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
        duration: 3000 // milliseconds
    },

    // Debug Settings
    debug: {
        enabled: true, // Set to true for console logging
        verboseLogging: false,
        showEventDetails: true
    }
};

// Apply configuration to analytics system
if (window.analytics) {
    // Configure server endpoint
    if (window.ANALYTICS_CONFIG.server.enabled) {
        window.analytics.apiEndpoint = window.ANALYTICS_CONFIG.server.endpoint;
    } else {
        window.analytics.apiEndpoint = null; // Disable server communication
    }

    // Configure debug mode
    window.analytics.debug = window.ANALYTICS_CONFIG.debug.enabled;
}