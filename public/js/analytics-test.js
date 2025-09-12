/**
 * Analytics Test Script
 * Run this in browser console to test if analytics is working
 */

window.testAnalytics = function() {
    console.log('🔍 Testing Vercel Analytics...');
    
    // Check if Vercel Analytics object exists
    if (typeof window.VercelAnalytics !== 'undefined') {
        console.log('✅ VercelAnalytics object found');
        
        // Check if va function exists (loaded from Vercel)
        if (typeof window.va !== 'undefined') {
            console.log('✅ Vercel va function loaded');
            
            // Test custom event
            try {
                window.VercelAnalytics.trackEvent('Analytics Test', {
                    test: true,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent.substring(0, 50)
                });
                console.log('✅ Test event sent successfully');
            } catch (error) {
                console.error('❌ Error sending test event:', error);
            }
            
        } else {
            console.warn('⚠️ Vercel va function not loaded yet. Wait a moment and try again.');
        }
        
    } else {
        console.error('❌ VercelAnalytics object not found. Check if vercel-analytics.js is loaded.');
    }
    
    // Check privacy settings
    const privacySettings = localStorage.getItem('portfolio_privacy_preferences');
    if (privacySettings) {
        const settings = JSON.parse(privacySettings);
        console.log('🔒 Privacy settings:', settings);
        if (!settings.analytics) {
            console.warn('⚠️ Analytics disabled by privacy settings');
        }
    } else {
        console.log('🔒 No privacy settings found (first visit)');
    }
    
    // Check if we're on the right domain
    console.log('🌐 Current domain:', window.location.hostname);
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.warn('⚠️ You are on localhost. Analytics only work on the live domain.');
    }
    
    // Test security headers
    console.log('🔒 Testing security headers...');
    fetch(window.location.href, { method: 'HEAD' })
        .then(response => {
            const headers = response.headers;
            console.log('🔒 Security headers check:');
            console.log('  CSP:', headers.get('content-security-policy') ? '✅' : '❌');
            console.log('  XFO:', headers.get('x-frame-options') ? '✅' : '❌');
            console.log('  COOP:', headers.get('cross-origin-opener-policy') ? '✅' : '❌');
        })
        .catch(error => {
            console.warn('⚠️ Could not check security headers:', error.message);
        });
    
    console.log('🔍 Test complete. Check above for any issues.');
};

// Auto-run test after 2 seconds if on live site
setTimeout(() => {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        console.log('🚀 Auto-running analytics test...');
        window.testAnalytics();
    }
}, 2000);

console.log('📊 Analytics test script loaded. Run testAnalytics() to test manually.');