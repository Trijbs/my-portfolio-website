/**
 * Analytics System
 * Handles user interaction tracking and analytics
 */

(function() {
    'use strict';
    
    // Check if analytics is enabled
    if (!window.analyticsConfig || !window.analyticsConfig.enabled) {
        return;
    }
    
    // Track clicks on important elements
    document.addEventListener('click', (e) => {
        if (!window.analyticsConfig.trackClicks) return;
        
        const target = e.target.closest('a, button, .btn');
        if (!target) return;
        
        const trackingData = {
            element: target.tagName.toLowerCase(),
            text: target.textContent?.trim().substring(0, 100),
            href: target.href || null,
            className: target.className || null
        };
        
        // Track specific interactions
        if (target.classList.contains('btn-primary')) {
            window.track('cta_click', trackingData);
        } else if (target.classList.contains('live-demo')) {
            window.track('demo_click', trackingData);
        } else if (target.href && target.href.startsWith('mailto:')) {
            window.track('email_click', trackingData);
        } else if (target.href && target.href.includes('github.com')) {
            window.track('github_click', trackingData);
        } else if (target.href && target.href.includes('instagram.com')) {
            window.track('social_click', { platform: 'instagram', ...trackingData });
        }
    });
    
    // Track form submissions
    document.addEventListener('submit', (e) => {
        if (!window.analyticsConfig.trackFormSubmissions) return;
        
        const form = e.target;
        if (form.id === 'contactForm') {
            window.track('contact_form_submit', {
                formId: form.id,
                fields: Array.from(form.elements)
                    .filter(el => el.name)
                    .map(el => el.name)
            });
        }
    });
    
    // Track scroll depth
    let maxScrollDepth = 0;
    let scrollDepthTracked = false;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollDepth = Math.round((scrollTop / documentHeight) * 100);
        
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
        }
        
        // Track when user reaches 75% scroll depth
        if (scrollDepth >= 75 && !scrollDepthTracked) {
            scrollDepthTracked = true;
            window.track('scroll_depth_75', { depth: scrollDepth });
        }
    });
    
    // Track time on page
    let startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        window.track('page_exit', {
            timeOnPage,
            maxScrollDepth
        });
    });
    
    // Track viewport size
    window.track('viewport_info', {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1
    });
    
})();