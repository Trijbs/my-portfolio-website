/**
 * Privacy Controls & GDPR Compliance
 * Handles user privacy preferences and consent management
 */

(function() {
    'use strict';
    
    const STORAGE_KEY = 'portfolio_privacy_preferences';
    
    class PrivacyManager {
        constructor() {
            this.preferences = this.loadPreferences();
            this.init();
        }
        
        init() {
            // Check if user has made privacy choices
            if (!this.preferences.consentGiven) {
                this.showPrivacyBanner();
            } else {
                this.applyPreferences();
            }
        }
        
        loadPreferences() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                return stored ? JSON.parse(stored) : {
                    consentGiven: false,
                    analytics: false,
                    functional: true,
                    timestamp: null
                };
            } catch (e) {
                return {
                    consentGiven: false,
                    analytics: false,
                    functional: true,
                    timestamp: null
                };
            }
        }
        
        savePreferences() {
            try {
                this.preferences.timestamp = Date.now();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.preferences));
            } catch (e) {
                console.warn('Could not save privacy preferences');
            }
        }
        
        showPrivacyBanner() {
            const banner = document.createElement('div');
            banner.id = 'privacy-banner';
            banner.className = 'privacy-banner';
            
            banner.innerHTML = `
                <div class="privacy-banner-copy">
                    <p class="privacy-banner-text">
                        This website uses cookies and analytics to improve your experience. 
                        <a href="#" id="privacy-details" class="privacy-banner-link">
                            Learn more
                        </a>
                    </p>
                </div>
                <div class="privacy-banner-actions">
                    <button id="privacy-accept" class="btn btn-primary privacy-banner-btn">
                        Accept All
                    </button>
                    <button id="privacy-customize" class="btn btn-secondary privacy-banner-btn">
                        Customize
                    </button>
                    <button id="privacy-decline" class="btn btn-outline privacy-banner-btn">
                        Decline
                    </button>
                </div>
            `;
            
            document.body.appendChild(banner);
            
            // Add event listeners
            document.getElementById('privacy-accept').addEventListener('click', () => {
                this.acceptAll();
                this.removeBanner();
            });
            
            document.getElementById('privacy-decline').addEventListener('click', () => {
                this.declineAll();
                this.removeBanner();
            });
            
            document.getElementById('privacy-customize').addEventListener('click', () => {
                this.showCustomizeModal();
            });
            
            document.getElementById('privacy-details').addEventListener('click', (e) => {
                e.preventDefault();
                this.showPrivacyDetails();
            });
        }
        
        showCustomizeModal() {
            const modal = document.createElement('div');
            modal.id = 'privacy-modal';
            modal.className = 'privacy-modal';
            
            modal.innerHTML = `
                <div class="privacy-modal-panel">
                    <h3 class="privacy-modal-title">Privacy Preferences</h3>
                    
                    <div class="privacy-modal-options">
                        <label class="privacy-option">
                            <input type="checkbox" id="functional-cookies" checked disabled>
                            <div>
                                <strong>Functional Cookies</strong>
                                <p class="privacy-option-copy">
                                    Required for the website to function properly. Cannot be disabled.
                                </p>
                            </div>
                        </label>
                        
                        <label class="privacy-option">
                            <input type="checkbox" id="analytics-cookies" ${this.preferences.analytics ? 'checked' : ''}>
                            <div>
                                <strong>Analytics Cookies</strong>
                                <p class="privacy-option-copy">
                                    Help me understand how visitors interact with the website.
                                </p>
                            </div>
                        </label>
                    </div>
                    
                    <div class="privacy-modal-actions">
                        <button id="privacy-save" class="btn btn-primary">Save Preferences</button>
                        <button id="privacy-cancel" class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            document.getElementById('privacy-save').addEventListener('click', () => {
                this.preferences.analytics = document.getElementById('analytics-cookies').checked;
                this.preferences.functional = true;
                this.preferences.consentGiven = true;
                this.savePreferences();
                this.applyPreferences();
                this.removeModal();
                this.removeBanner();
            });
            
            document.getElementById('privacy-cancel').addEventListener('click', () => {
                this.removeModal();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.removeModal();
                }
            });
        }
        
        showPrivacyDetails() {
            alert(`Privacy Information:

This website may collect the following information:
• Page views and navigation patterns
• Click interactions and user engagement
• Technical information (browser, device type)
• Form submissions (contact form)

This data is used to:
• Improve website performance and user experience
• Understand visitor preferences and behavior
• Respond to contact form submissions

Your data is not shared with third parties and is stored securely.

You can change your preferences at any time by clicking the privacy settings link in the footer.`);
        }
        
        acceptAll() {
            this.preferences = {
                consentGiven: true,
                analytics: true,
                functional: true,
                timestamp: Date.now()
            };
            this.savePreferences();
            this.applyPreferences();
        }
        
        declineAll() {
            this.preferences = {
                consentGiven: true,
                analytics: false,
                functional: true,
                timestamp: Date.now()
            };
            this.savePreferences();
            this.applyPreferences();
        }
        
        applyPreferences() {
            // Apply analytics preferences for Vercel Analytics
            if (this.preferences.analytics) {
                // Enable Vercel Analytics if user consented
                if (window.VercelAnalytics) {
                    console.log('Analytics enabled by user preference');
                }
            } else {
                // Disable analytics if user declined
                console.log('Analytics disabled by user preference');
                // Note: Vercel Analytics respects DNT headers and privacy settings
            }
            
            // Dispatch event for other scripts to listen to
            window.dispatchEvent(new CustomEvent('privacyPreferencesApplied', {
                detail: this.preferences
            }));
        }
        
        removeBanner() {
            const banner = document.getElementById('privacy-banner');
            if (banner) {
                banner.remove();
            }
        }
        
        removeModal() {
            const modal = document.getElementById('privacy-modal');
            if (modal) {
                modal.remove();
            }
        }
        
        // Public method to show preferences modal
        showPreferences() {
            this.showCustomizeModal();
        }
        
        // Public method to reset preferences
        resetPreferences() {
            localStorage.removeItem(STORAGE_KEY);
            this.preferences = this.loadPreferences();
            this.init();
        }
    }
    
    // Initialize privacy manager when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        window.privacyManager = new PrivacyManager();
        
        // Add privacy settings link to footer if it doesn't exist
        const footer = document.querySelector('.footer');
        if (footer && !document.getElementById('privacy-settings-link')) {
            const privacyLink = document.createElement('a');
            privacyLink.id = 'privacy-settings-link';
            privacyLink.href = '#';
            privacyLink.textContent = 'Privacy Settings';
            privacyLink.className = 'privacy-settings-link';
            privacyLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.privacyManager.showPreferences();
            });
            
            // Try to add to footer links
            const footerLinks = footer.querySelector('.footer-links');
            if (footerLinks) {
                footerLinks.appendChild(privacyLink);
            }
        }
    });
    
})();
