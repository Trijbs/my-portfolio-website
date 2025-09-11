/**
 * Advanced User Tracking & Analytics System
 * Tracks comprehensive user behavior and interactions
 */

class AdvancedAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
        this.startTime = Date.now();
        this.events = [];
        this.heatmapData = [];
        this.scrollData = [];
        this.performanceData = {};
        this.deviceInfo = this.getDeviceInfo();
        this.isTracking = true;
        this.apiEndpoint = '/api/analytics'; // You can change this to your backend endpoint
        
        this.init();
    }

    init() {
        this.trackPageLoad();
        this.setupEventListeners();
        this.startHeartbeat();
        this.trackPerformance();
        this.setupVisibilityTracking();
        this.trackUserAgent();
        this.setupScrollTracking();
        this.setupClickTracking();
        this.setupFormTracking();
        this.setupKeyboardTracking();
        this.setupMouseTracking();
        this.setupTouchTracking();
        this.setupResizeTracking();
        this.setupNetworkTracking();
        this.setupErrorTracking();
    }

    // Session Management
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getUserId() {
        let userId = localStorage.getItem('analytics_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('analytics_user_id', userId);
        }
        return userId;
    }

    // Device & Browser Information
    getDeviceInfo() {
        const nav = navigator;
        const screen = window.screen;
        
        return {
            userAgent: nav.userAgent,
            platform: nav.platform,
            language: nav.language,
            languages: nav.languages,
            cookieEnabled: nav.cookieEnabled,
            onLine: nav.onLine,
            screenWidth: screen.width,
            screenHeight: screen.height,
            screenColorDepth: screen.colorDepth,
            screenPixelDepth: screen.pixelDepth,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            touchSupport: 'ontouchstart' in window,
            deviceMemory: nav.deviceMemory || 'unknown',
            hardwareConcurrency: nav.hardwareConcurrency || 'unknown',
            connection: nav.connection ? {
                effectiveType: nav.connection.effectiveType,
                downlink: nav.connection.downlink,
                rtt: nav.connection.rtt
            } : null
        };
    }

    // Core Tracking Methods
    trackEvent(eventType, data = {}) {
        if (!this.isTracking) return;

        const event = {
            id: this.generateEventId(),
            sessionId: this.sessionId,
            userId: this.userId,
            timestamp: Date.now(),
            eventType,
            url: window.location.href,
            referrer: document.referrer,
            ...data
        };

        this.events.push(event);
        this.sendEventToServer(event);
        
        // Store in localStorage as backup
        this.storeEventLocally(event);
    }

    trackPageLoad() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        
        this.trackEvent('page_load', {
            loadTime,
            pageTitle: document.title,
            deviceInfo: this.deviceInfo,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    }

    // Scroll Tracking
    setupScrollTracking() {
        let scrollTimeout;
        let maxScroll = 0;
        let scrollEvents = 0;

        window.addEventListener('scroll', () => {
            scrollEvents++;
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            maxScroll = Math.max(maxScroll, scrollPercent);

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.trackEvent('scroll', {
                    scrollPercent,
                    maxScroll,
                    scrollEvents,
                    scrollY: window.scrollY
                });
            }, 250);
        });

        // Track scroll milestones
        const milestones = [25, 50, 75, 90, 100];
        let reachedMilestones = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
                    reachedMilestones.add(milestone);
                    this.trackEvent('scroll_milestone', {
                        milestone,
                        timeToReach: Date.now() - this.startTime
                    });
                }
            });
        });
    }

    // Click Tracking & Heatmap
    setupClickTracking() {
        document.addEventListener('click', (e) => {
            const rect = e.target.getBoundingClientRect();
            const clickData = {
                x: e.clientX,
                y: e.clientY,
                elementX: rect.left,
                elementY: rect.top,
                elementWidth: rect.width,
                elementHeight: rect.height,
                tagName: e.target.tagName,
                className: e.target.className,
                id: e.target.id,
                text: e.target.textContent?.substring(0, 100),
                href: e.target.href || null,
                selector: this.getElementSelector(e.target)
            };

            this.heatmapData.push(clickData);
            this.trackEvent('click', clickData);
        });

        // Right-click tracking
        document.addEventListener('contextmenu', (e) => {
            this.trackEvent('right_click', {
                x: e.clientX,
                y: e.clientY,
                tagName: e.target.tagName,
                selector: this.getElementSelector(e.target)
            });
        });
    }

    // Mouse Movement Tracking
    setupMouseTracking() {
        let mouseData = [];
        let mouseTimeout;

        document.addEventListener('mousemove', (e) => {
            mouseData.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });

            // Batch mouse movements
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                if (mouseData.length > 0) {
                    this.trackEvent('mouse_movement', {
                        movements: mouseData.slice(-50), // Keep last 50 movements
                        totalMovements: mouseData.length
                    });
                    mouseData = [];
                }
            }, 1000);
        });

        // Mouse enter/leave tracking
        document.addEventListener('mouseenter', () => {
            this.trackEvent('mouse_enter');
        });

        document.addEventListener('mouseleave', () => {
            this.trackEvent('mouse_leave', {
                timeOnPage: Date.now() - this.startTime
            });
        });
    }

    // Touch Tracking for Mobile
    setupTouchTracking() {
        if (!('ontouchstart' in window)) return;

        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.trackEvent('touch_start', {
                x: touch.clientX,
                y: touch.clientY,
                touches: e.touches.length
            });
        });

        document.addEventListener('touchend', (e) => {
            this.trackEvent('touch_end', {
                touches: e.touches.length
            });
        });

        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            this.trackEvent('touch_move', {
                x: touch.clientX,
                y: touch.clientY,
                touches: e.touches.length
            });
        });
    }

    // Form Tracking
    setupFormTracking() {
        document.addEventListener('focus', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                this.trackEvent('form_focus', {
                    fieldName: e.target.name || e.target.id,
                    fieldType: e.target.type,
                    selector: this.getElementSelector(e.target)
                });
            }
        });

        document.addEventListener('blur', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                this.trackEvent('form_blur', {
                    fieldName: e.target.name || e.target.id,
                    fieldType: e.target.type,
                    hasValue: !!e.target.value,
                    valueLength: e.target.value?.length || 0
                });
            }
        });

        document.addEventListener('submit', (e) => {
            const form = e.target;
            const formData = new FormData(form);
            const fields = {};
            
            for (let [key, value] of formData.entries()) {
                fields[key] = {
                    hasValue: !!value,
                    length: value.length
                };
            }

            this.trackEvent('form_submit', {
                formId: form.id,
                formClass: form.className,
                fields
            });
        });
    }

    // Keyboard Tracking
    setupKeyboardTracking() {
        let keystrokes = 0;
        let keyTimeout;

        document.addEventListener('keydown', (e) => {
            keystrokes++;
            
            clearTimeout(keyTimeout);
            keyTimeout = setTimeout(() => {
                this.trackEvent('keyboard_activity', {
                    keystrokes,
                    lastKey: e.key === ' ' ? 'space' : e.key.length === 1 ? 'character' : e.key
                });
                keystrokes = 0;
            }, 2000);
        });

        // Track specific key combinations
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                this.trackEvent('keyboard_shortcut', {
                    key: e.key,
                    ctrl: e.ctrlKey,
                    meta: e.metaKey,
                    shift: e.shiftKey,
                    alt: e.altKey
                });
            }
        });
    }

    // Window Resize Tracking
    setupResizeTracking() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.trackEvent('window_resize', {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    orientation: window.screen.orientation?.type || 'unknown'
                });
            }, 250);
        });
    }

    // Network Tracking
    setupNetworkTracking() {
        if (navigator.connection) {
            navigator.connection.addEventListener('change', () => {
                this.trackEvent('network_change', {
                    effectiveType: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink,
                    rtt: navigator.connection.rtt
                });
            });
        }

        window.addEventListener('online', () => {
            this.trackEvent('network_online');
        });

        window.addEventListener('offline', () => {
            this.trackEvent('network_offline');
        });
    }

    // Error Tracking
    setupErrorTracking() {
        window.addEventListener('error', (e) => {
            this.trackEvent('javascript_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                stack: e.error?.stack
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.trackEvent('promise_rejection', {
                reason: e.reason?.toString(),
                stack: e.reason?.stack
            });
        });
    }

    // Performance Tracking
    trackPerformance() {
        if (performance.timing) {
            const timing = performance.timing;
            this.performanceData = {
                navigationStart: timing.navigationStart,
                domainLookupStart: timing.domainLookupStart - timing.navigationStart,
                domainLookupEnd: timing.domainLookupEnd - timing.navigationStart,
                connectStart: timing.connectStart - timing.navigationStart,
                connectEnd: timing.connectEnd - timing.navigationStart,
                requestStart: timing.requestStart - timing.navigationStart,
                responseStart: timing.responseStart - timing.navigationStart,
                responseEnd: timing.responseEnd - timing.navigationStart,
                domLoading: timing.domLoading - timing.navigationStart,
                domInteractive: timing.domInteractive - timing.navigationStart,
                domContentLoadedEventStart: timing.domContentLoadedEventStart - timing.navigationStart,
                domContentLoadedEventEnd: timing.domContentLoadedEventEnd - timing.navigationStart,
                domComplete: timing.domComplete - timing.navigationStart,
                loadEventStart: timing.loadEventStart - timing.navigationStart,
                loadEventEnd: timing.loadEventEnd - timing.navigationStart
            };

            this.trackEvent('performance_timing', this.performanceData);
        }

        // Track resource loading
        if (performance.getEntriesByType) {
            const resources = performance.getEntriesByType('resource');
            resources.forEach(resource => {
                this.trackEvent('resource_load', {
                    name: resource.name,
                    duration: resource.duration,
                    size: resource.transferSize,
                    type: resource.initiatorType
                });
            });
        }
    }

    // Visibility Tracking
    setupVisibilityTracking() {
        let visibilityStart = Date.now();
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackEvent('page_hidden', {
                    visibleTime: Date.now() - visibilityStart
                });
            } else {
                visibilityStart = Date.now();
                this.trackEvent('page_visible');
            }
        });

        // Track when user is about to leave
        window.addEventListener('beforeunload', () => {
            this.trackEvent('page_unload', {
                totalTime: Date.now() - this.startTime,
                maxScroll: Math.max(...this.scrollData.map(s => s.scrollPercent || 0))
            });
        });
    }

    // User Agent Tracking
    trackUserAgent() {
        const parser = this.parseUserAgent(navigator.userAgent);
        this.trackEvent('user_agent', parser);
    }

    parseUserAgent(ua) {
        const browser = {
            name: 'Unknown',
            version: 'Unknown'
        };
        
        const os = {
            name: 'Unknown',
            version: 'Unknown'
        };

        // Browser detection
        if (ua.includes('Chrome')) {
            browser.name = 'Chrome';
            browser.version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Firefox')) {
            browser.name = 'Firefox';
            browser.version = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
            browser.name = 'Safari';
            browser.version = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Edge')) {
            browser.name = 'Edge';
            browser.version = ua.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
        }

        // OS detection
        if (ua.includes('Windows')) {
            os.name = 'Windows';
            os.version = ua.match(/Windows NT ([0-9.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Mac OS')) {
            os.name = 'macOS';
            os.version = ua.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || 'Unknown';
        } else if (ua.includes('Linux')) {
            os.name = 'Linux';
        } else if (ua.includes('Android')) {
            os.name = 'Android';
            os.version = ua.match(/Android ([0-9.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('iOS')) {
            os.name = 'iOS';
            os.version = ua.match(/OS ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || 'Unknown';
        }

        return { browser, os };
    }

    // Utility Methods
    getElementSelector(element) {
        if (element.id) return `#${element.id}`;
        if (element.className) return `.${element.className.split(' ')[0]}`;
        return element.tagName.toLowerCase();
    }

    generateEventId() {
        return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Data Management
    storeEventLocally(event) {
        const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
        events.push(event);
        
        // Keep only last 1000 events
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }
        
        localStorage.setItem('analytics_events', JSON.stringify(events));
    }

    sendEventToServer(event) {
        // Send to your analytics server
        if (this.apiEndpoint) {
            fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            }).catch(error => {
                console.warn('Analytics tracking failed:', error);
            });
        }
    }

    // Heartbeat to track session duration
    startHeartbeat() {
        setInterval(() => {
            this.trackEvent('heartbeat', {
                sessionDuration: Date.now() - this.startTime,
                eventsCount: this.events.length
            });
        }, 30000); // Every 30 seconds
    }

    // Public API
    track(eventName, data = {}) {
        this.trackEvent(eventName, data);
    }

    getSessionData() {
        return {
            sessionId: this.sessionId,
            userId: this.userId,
            startTime: this.startTime,
            duration: Date.now() - this.startTime,
            events: this.events,
            heatmapData: this.heatmapData,
            deviceInfo: this.deviceInfo
        };
    }

    exportData() {
        const data = {
            session: this.getSessionData(),
            localStorage: JSON.parse(localStorage.getItem('analytics_events') || '[]')
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics_${this.sessionId}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Privacy Controls
    stopTracking() {
        this.isTracking = false;
        this.trackEvent('tracking_stopped');
    }

    startTracking() {
        this.isTracking = true;
        this.trackEvent('tracking_started');
    }

    clearData() {
        localStorage.removeItem('analytics_events');
        localStorage.removeItem('analytics_user_id');
        this.events = [];
        this.heatmapData = [];
        this.trackEvent('data_cleared');
    }
}

// Initialize analytics
window.analytics = new AdvancedAnalytics();

// Expose global tracking function
window.track = (eventName, data) => {
    window.analytics.track(eventName, data);
};