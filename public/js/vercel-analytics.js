/**
 * Vercel Web Analytics Integration
 * This script initializes Vercel's web analytics for tracking page views and user interactions
 */

// Load Vercel Analytics script
(function() {
  const script = document.createElement('script');
  script.src = 'https://va.vercel-scripts.com/v1/script.js';
  script.defer = true;
  script.setAttribute('data-website-id', 'auto'); // Vercel will auto-detect
  document.head.appendChild(script);
})();

// Analytics helper functions
window.VercelAnalytics = {
  // Track custom events
  trackEvent: function(eventName, properties = {}) {
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', eventName, properties);
    }
  },

  // Track page views manually if needed
  trackPageView: function(path) {
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', 'pageview', { path: path || window.location.pathname });
    }
  },

  // Track contact form submissions
  trackContactSubmission: function() {
    this.trackEvent('Contact Form Submitted', {
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  },

  // Track project clicks
  trackProjectClick: function(projectName) {
    this.trackEvent('Project Clicked', {
      project: projectName,
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  },

  // Track social media clicks
  trackSocialClick: function(platform) {
    this.trackEvent('Social Media Clicked', {
      platform: platform,
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  },

  // Track business card views
  trackBusinessCardView: function() {
    this.trackEvent('Business Card Viewed', {
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  },

  // Track theme changes
  trackThemeChange: function(theme) {
    this.trackEvent('Theme Changed', {
      theme: theme,
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  }
};

console.log('Vercel Analytics initialized successfully');