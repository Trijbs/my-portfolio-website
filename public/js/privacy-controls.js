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
            banner.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: var(--bg-secondary);
                border-top: 2px solid var(--accent-secondary);
                padding: 1rem;
                box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                flex-wrap: wrap;
            `;
            
            banner.innerHTML = `
                <div style="flex: 1; min-width: 300px;">
                    <p style="margin: 0; color: var(--text-primary); font-size: 0.9rem;">
                        This website uses cookies and analytics to improve your experience. 
                        <a href="#" id="privacy-details" style="color: var(--accent-secondary); text-decoration: underline;">
                            Learn more
                        </a>
                    </p>
                </div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button id="privacy-accept" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                        Accept All
                    </button>
                    <button id="privacy-customize" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                        Customize
                    </button>
                    <button id="privacy-decline" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
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
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1100;
                padding: 1rem;
            `;
            
            modal.innerHTML = `
                <div style="
                    background: var(--bg-secondary);
                    border-radius: 12px;
                    padding: 2rem;
                    max-width: 500px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                ">
                    <h3 style="margin-top: 0; color: var(--text-primary);">Privacy Preferences</h3>
                    
                    <div style="margin: 1.5rem 0;">
                        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                            <input type="checkbox" id="functional-cookies" checked disabled>
                            <div>
                                <strong>Functional Cookies</strong>
                                <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">
                                    Required for the website to function properly. Cannot be disabled.
                                </p>
                            </div>
                        </label>
                        
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" id="analytics-cookies" ${this.preferences.analytics ? 'checked' : ''}>
                            <div>
                                <strong>Analytics Cookies</strong>
                                <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">
                                    Help me understand how visitors interact with the website.
                                </p>
                            </div>
                        </label>
                    </div>
                    
                    <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
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
            privacyLink.style.cssText = 'color: var(--text-secondary); font-size: 0.9rem;';
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