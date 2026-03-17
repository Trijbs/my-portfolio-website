/**
 * Analytics bridge for Vercel Web Analytics and the local /api/analytics endpoint.
 * Custom events only fire after the visitor has granted analytics consent.
 */

(function() {
    'use strict';

    const ANALYTICS_ENDPOINT = '/api/analytics';
    const USER_KEY = 'portfolio_analytics_user_id';
    const SESSION_KEY = 'portfolio_analytics_session_id';
    const PRIVACY_KEY = 'portfolio_privacy_preferences';
    const ADMIN_PATH_PREFIX = '/analytics';
    const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

    let analyticsEnabled = false;
    let pageViewTracked = false;
    let vercelScriptLoaded = false;
    let analyticsFailureCount = 0;
    let analyticsBackoffUntil = 0;
    const pendingVercelEvents = [];

    function readPrivacyPreferences() {
        try {
            const stored = localStorage.getItem(PRIVACY_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            return null;
        }
    }

    function syncAnalyticsPreference(preferences = readPrivacyPreferences()) {
        analyticsEnabled = Boolean(preferences?.consentGiven && preferences?.analytics);

        if (analyticsEnabled && !isLocalPreview()) {
            loadVercelScript();
        }
    }

    function isLocalPreview() {
        return window.location.protocol === 'file:' || LOCAL_HOSTS.has(window.location.hostname);
    }

    function loadVercelScript() {
        if (vercelScriptLoaded || typeof document === 'undefined') {
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://va.vercel-scripts.com/v1/script.js';
        script.defer = true;
        script.setAttribute('data-website-id', 'auto');
        script.addEventListener('load', flushQueuedVercelEvents);
        document.head.appendChild(script);
        vercelScriptLoaded = true;
    }

    function flushQueuedVercelEvents() {
        if (typeof window.va !== 'function' || !pendingVercelEvents.length) {
            return;
        }

        while (pendingVercelEvents.length) {
            const event = pendingVercelEvents.shift();
            window.va('track', event.name, event.properties);
        }
    }

    function generateId(prefix) {
        const randomBuffer = new Uint8Array(8);
        if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
            window.crypto.getRandomValues(randomBuffer);
        } else {
            return `${prefix}-${Date.now().toString(36)}-no-crypto`;
        }

        const randomSuffix = Array.from(randomBuffer)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');

        return `${prefix}-${Date.now().toString(36)}-${randomSuffix}`;
    }

    function getUserId() {
        try {
            const stored = localStorage.getItem(USER_KEY);
            if (stored) {
                return stored;
            }

            const generated = generateId('usr');
            localStorage.setItem(USER_KEY, generated);
            return generated;
        } catch (error) {
            return generateId('usr');
        }
    }

    function getSessionId() {
        try {
            const stored = sessionStorage.getItem(SESSION_KEY);
            if (stored) {
                return stored;
            }

            const generated = generateId('ses');
            sessionStorage.setItem(SESSION_KEY, generated);
            return generated;
        } catch (error) {
            return generateId('ses');
        }
    }

    function getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    }

    function onAdminPage() {
        return window.location.pathname === ADMIN_PATH_PREFIX || window.location.pathname.startsWith(`${ADMIN_PATH_PREFIX}/`);
    }

    function trackWithVercel(eventName, properties = {}) {
        if (isLocalPreview()) {
            return;
        }

        if (!analyticsEnabled || typeof window.va !== 'function') {
            if (analyticsEnabled) {
                pendingVercelEvents.push({ name: eventName, properties });
            }
            return;
        }

        window.va('track', eventName, properties);
    }

    function postEvent(eventType, properties = {}) {
        if (!analyticsEnabled || onAdminPage() || isLocalPreview()) {
            return Promise.resolve(false);
        }

        if (analyticsBackoffUntil > Date.now()) {
            return Promise.resolve(false);
        }

        const payload = {
            eventType,
            timestamp: Date.now(),
            sessionId: getSessionId(),
            userId: getUserId(),
            url: window.location.href,
            path: window.location.pathname,
            referrer: document.referrer || '',
            title: document.title,
            deviceInfo: getDeviceInfo(),
            ...properties
        };

        return fetch(ANALYTICS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            keepalive: true,
            body: JSON.stringify(payload)
        })
            .then((response) => {
                if (!response.ok) {
                    analyticsFailureCount += 1;

                    if (analyticsFailureCount >= 3) {
                        analyticsBackoffUntil = Date.now() + (5 * 60 * 1000);
                    }

                    return false;
                }

                analyticsFailureCount = 0;
                analyticsBackoffUntil = 0;
                return true;
            })
            .catch(() => {
                analyticsFailureCount += 1;

                if (analyticsFailureCount >= 3) {
                    analyticsBackoffUntil = Date.now() + (5 * 60 * 1000);
                }

                return false;
            });
    }

    function trackEvent(eventName, properties = {}) {
        trackWithVercel(eventName, properties);
        return postEvent(eventName, properties);
    }

    function trackPageView(pathname) {
        const path = pathname || window.location.pathname;
        trackWithVercel('pageview', { path });
        return postEvent('page_load', { path });
    }

    function trackContactSubmission() {
        return trackEvent('contact_form_submitted', {
            page: window.location.pathname
        });
    }

    function trackProjectClick(projectName) {
        return trackEvent('project_clicked', {
            project: projectName,
            page: window.location.pathname
        });
    }

    function trackSocialClick(platform) {
        return trackEvent('social_clicked', {
            platform,
            page: window.location.pathname
        });
    }

    function trackBusinessCardView() {
        return trackEvent('business_card_view', {
            page: window.location.pathname
        });
    }

    function trackThemeChange(theme) {
        return trackEvent('theme_changed', {
            theme,
            page: window.location.pathname
        });
    }

    function getTargetLabel(target) {
        return (
            target.getAttribute('aria-label') ||
            target.getAttribute('alt') ||
            target.textContent ||
            target.getAttribute('title') ||
            ''
        ).trim().slice(0, 120);
    }

    function installAutoTracking() {
        let lastClickTimestamp = 0;

        document.addEventListener('click', (event) => {
            if (!analyticsEnabled || onAdminPage()) {
                return;
            }

            const target = event.target.closest('a, button, .media-zoom-trigger, img, video');
            if (!target) {
                return;
            }

            const now = Date.now();
            if (now - lastClickTimestamp < 250) {
                return;
            }

            lastClickTimestamp = now;

            postEvent('click', {
                x: event.clientX,
                y: event.clientY,
                targetTag: target.tagName.toLowerCase(),
                targetLabel: getTargetLabel(target),
                href: target.getAttribute('href') || '',
                targetProject: target.getAttribute('data-project') || ''
            });
        }, true);

        window.addEventListener('error', (event) => {
            if (!analyticsEnabled || onAdminPage()) {
                return;
            }

            postEvent('javascript_error', {
                message: event.message || 'Unknown error',
                source: event.filename || '',
                line: event.lineno || 0,
                column: event.colno || 0
            });
        });

        window.addEventListener('load', () => {
            if (!analyticsEnabled || onAdminPage()) {
                return;
            }

            window.setTimeout(() => {
                const navigationEntry = performance.getEntriesByType('navigation')[0];
                if (!navigationEntry) {
                    return;
                }

                postEvent('performance_timing', {
                    loadEventEnd: Math.round(navigationEntry.loadEventEnd),
                    domContentLoadedEventEnd: Math.round(navigationEntry.domContentLoadedEventEnd),
                    responseEnd: Math.round(navigationEntry.responseEnd),
                    transferSize: navigationEntry.transferSize || 0,
                    entryType: navigationEntry.type || 'navigate'
                });
            }, 0);
        });
    }

    window.VercelAnalytics = {
        trackEvent,
        trackPageView,
        trackContactSubmission,
        trackProjectClick,
        trackSocialClick,
        trackBusinessCardView,
        trackThemeChange,
        isEnabled() {
            return analyticsEnabled;
        }
    };

    syncAnalyticsPreference();
    installAutoTracking();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (analyticsEnabled && !pageViewTracked && !onAdminPage()) {
                pageViewTracked = true;
                trackPageView();
            }
        });
    } else if (analyticsEnabled && !pageViewTracked && !onAdminPage()) {
        pageViewTracked = true;
        trackPageView();
    }

    window.addEventListener('privacyPreferencesApplied', (event) => {
        syncAnalyticsPreference(event.detail);

        if (analyticsEnabled && !pageViewTracked && !onAdminPage()) {
            pageViewTracked = true;
            trackPageView();
        }
    });
})();
