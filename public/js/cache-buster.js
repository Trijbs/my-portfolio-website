/**
 * Cache Buster Utility
 * Forces browser to reload CSS and JS files when updates are deployed
 */

(function() {
    'use strict';
    
    // Version check and cache busting
    const CURRENT_VERSION = '2.0.0';
    const STORAGE_KEY = 'portfolio_version';
    
    function getStoredVersion() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }
    
    function setStoredVersion(version) {
        try {
            localStorage.setItem(STORAGE_KEY, version);
        } catch (e) {
            // Ignore localStorage errors
        }
    }
    
    function showUpdateNotice() {
        const notice = document.createElement('div');
        notice.className = 'version-update-notice';
        notice.innerHTML = `
            ✨ New version available!
            <button onclick="window.location.reload(true)">Refresh</button>
        `;
        
        document.body.appendChild(notice);
        
        // Show the notice
        setTimeout(() => {
            notice.classList.add('show');
        }, 100);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (notice.parentNode) {
                notice.classList.remove('show');
                setTimeout(() => {
                    if (notice.parentNode) {
                        notice.parentNode.removeChild(notice);
                    }
                }, 300);
            }
        }, 10000);
    }
    
    function forceReload() {
        console.log('🔄 New version detected, forcing reload...');
        window.location.reload(true);
    }
    
    function checkVersion() {
        const storedVersion = getStoredVersion();
        
        if (storedVersion && storedVersion !== CURRENT_VERSION) {
            setStoredVersion(CURRENT_VERSION);
            
            // Show update notice instead of immediate reload
            if (document.readyState === 'complete') {
                showUpdateNotice();
            } else {
                // If page is still loading, just reload
                setTimeout(forceReload, 100);
            }
            return;
        }
        
        if (!storedVersion) {
            setStoredVersion(CURRENT_VERSION);
        }
    }
    
    // Check version on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkVersion);
    } else {
        checkVersion();
    }
    
    // Expose version info for debugging
    window.portfolioVersion = CURRENT_VERSION;
    console.log('📦 Portfolio version:', CURRENT_VERSION);
    
})();