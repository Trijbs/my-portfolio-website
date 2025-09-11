/**
 * Privacy Controls & GDPR Compliance
 * Manages user consent and privacy preferences
 */

class PrivacyManager {
    constructor() {
        this.consentKey = 'analytics_consent';
        this.preferencesKey = 'privacy_preferences';
        this.hasConsent = this.getStoredConsent();
        this.preferences = this.getStoredPreferences();
        
        this.init();
    }

    init() {
        this.createConsentBanner();
        this.createPrivacyControls();
        this.setupEventListeners();
        
        // Show banner if no consent given
        if (this.hasConsent === null) {
            this.showConsentBanner();
        }
    }

    getStoredConsent() {
        const consent = localStorage.getItem(this.consentKey);
        return consent ? JSON.parse(consent) : null;
    }

    getStoredPreferences() {
        const prefs = localStorage.getItem(this.preferencesKey);
        return prefs ? JSON.parse(prefs) : {
            analytics: true,
            performance: true,
            functional: true,
            marketing: false
        };
    }

    setConsent(consent) {
        this.hasConsent = consent;
        localStorage.setItem(this.consentKey, JSON.stringify({
            consent,
            timestamp: Date.now(),
            version: '1.0'
        }));

        // Enable/disable analytics based on consent
        if (window.analytics) {
            if (consent) {
                window.analytics.startTracking();
            } else {
                window.analytics.stopTracking();
            }
        }
    }

    setPreferences(preferences) {
        this.preferences = { ...this.preferences, ...preferences };
        localStorage.setItem(this.preferencesKey, JSON.stringify(this.preferences));
        
        // Apply preferences to analytics
        this.applyPreferences();
    }

    applyPreferences() {
        if (window.analytics) {
            // Configure analytics based on preferences
            if (!this.preferences.analytics) {
                window.analytics.stopTracking();
            } else {
                window.analytics.startTracking();
            }
        }
    }

    createConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'consent-banner';
        banner.className = 'consent-banner';
        banner.innerHTML = `
            <div class="consent-content">
                <div class="consent-text">
                    <h3>🍪 We value your privacy</h3>
                    <p>This website uses analytics to improve your experience and understand how you interact with our content. We collect anonymous data about your visit to help us make the site better.</p>
                </div>
                <div class="consent-actions">
                    <button class="btn-consent btn-accept" onclick="privacyManager.acceptAll()">
                        Accept All
                    </button>
                    <button class="btn-consent btn-customize" onclick="privacyManager.showPreferences()">
                        Customize
                    </button>
                    <button class="btn-consent btn-decline" onclick="privacyManager.declineAll()">
                        Decline
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
    }

    createPrivacyControls() {
        const controls = document.createElement('div');
        controls.id = 'privacy-controls';
        controls.className = 'privacy-controls';
        controls.innerHTML = `
            <button class="privacy-toggle" onclick="privacyManager.showPreferences()" title="Privacy Settings">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            </button>
        `;

        document.body.appendChild(controls);
    }

    createPreferencesModal() {
        const modal = document.createElement('div');
        modal.id = 'preferences-modal';
        modal.className = 'preferences-modal';
        modal.innerHTML = `
            <div class="preferences-content">
                <div class="preferences-header">
                    <h2>Privacy Preferences</h2>
                    <button class="close-preferences" onclick="privacyManager.hidePreferences()">×</button>
                </div>
                <div class="preferences-body">
                    <div class="preference-section">
                        <h3>Essential Cookies</h3>
                        <p>These cookies are necessary for the website to function and cannot be switched off.</p>
                        <label class="preference-toggle">
                            <input type="checkbox" checked disabled>
                            <span class="toggle-slider"></span>
                            Always Active
                        </label>
                    </div>
                    
                    <div class="preference-section">
                        <h3>Analytics Cookies</h3>
                        <p>These cookies help us understand how visitors interact with our website.</p>
                        <label class="preference-toggle">
                            <input type="checkbox" id="analytics-toggle" ${this.preferences.analytics ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            ${this.preferences.analytics ? 'Enabled' : 'Disabled'}
                        </label>
                    </div>
                    
                    <div class="preference-section">
                        <h3>Performance Cookies</h3>
                        <p>These cookies help us monitor website performance and loading times.</p>
                        <label class="preference-toggle">
                            <input type="checkbox" id="performance-toggle" ${this.preferences.performance ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            ${this.preferences.performance ? 'Enabled' : 'Disabled'}
                        </label>
                    </div>
                    
                    <div class="preference-section">
                        <h3>Functional Cookies</h3>
                        <p>These cookies enable enhanced functionality and personalization.</p>
                        <label class="preference-toggle">
                            <input type="checkbox" id="functional-toggle" ${this.preferences.functional ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            ${this.preferences.functional ? 'Enabled' : 'Disabled'}
                        </label>
                    </div>
                </div>
                <div class="preferences-footer">
                    <button class="btn-preferences btn-save" onclick="privacyManager.savePreferences()">
                        Save Preferences
                    </button>
                    <button class="btn-preferences btn-accept-all" onclick="privacyManager.acceptAll()">
                        Accept All
                    </button>
                </div>
                <div class="privacy-info">
                    <p><strong>Data We Collect:</strong></p>
                    <ul>
                        <li>Page views and navigation patterns</li>
                        <li>Click interactions and scroll behavior</li>
                        <li>Device and browser information</li>
                        <li>Performance metrics</li>
                        <li>Session duration and frequency</li>
                    </ul>
                    <p><strong>Data We Don't Collect:</strong></p>
                    <ul>
                        <li>Personal identifying information</li>
                        <li>Form input content</li>
                        <li>Passwords or sensitive data</li>
                        <li>Cross-site tracking data</li>
                    </ul>
                    <div class="data-controls">
                        <button class="btn-data-control" onclick="privacyManager.exportData()">
                            📥 Export My Data
                        </button>
                        <button class="btn-data-control" onclick="privacyManager.deleteData()">
                            🗑️ Delete My Data
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    setupEventListeners() {
        // Listen for preference toggle changes
        document.addEventListener('change', (e) => {
            if (e.target.matches('#analytics-toggle, #performance-toggle, #functional-toggle')) {
                const label = e.target.parentElement.querySelector('.toggle-slider').nextSibling;
                label.textContent = e.target.checked ? 'Enabled' : 'Disabled';
            }
        });
    }

    showConsentBanner() {
        const banner = document.getElementById('consent-banner');
        if (banner) {
            banner.style.display = 'block';
            setTimeout(() => banner.classList.add('show'), 100);
        }
    }

    hideConsentBanner() {
        const banner = document.getElementById('consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.style.display = 'none', 300);
        }
    }

    showPreferences() {
        let modal = document.getElementById('preferences-modal');
        if (!modal) {
            this.createPreferencesModal();
            modal = document.getElementById('preferences-modal');
        }
        
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 100);
        document.body.style.overflow = 'hidden';
    }

    hidePreferences() {
        const modal = document.getElementById('preferences-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    acceptAll() {
        this.setConsent(true);
        this.setPreferences({
            analytics: true,
            performance: true,
            functional: true,
            marketing: false
        });
        
        this.hideConsentBanner();
        this.hidePreferences();
        
        this.showNotification('All cookies accepted. Thank you!', 'success');
    }

    declineAll() {
        this.setConsent(false);
        this.setPreferences({
            analytics: false,
            performance: false,
            functional: false,
            marketing: false
        });
        
        this.hideConsentBanner();
        this.hidePreferences();
        
        this.showNotification('Only essential cookies will be used.', 'info');
    }

    savePreferences() {
        const analytics = document.getElementById('analytics-toggle')?.checked || false;
        const performance = document.getElementById('performance-toggle')?.checked || false;
        const functional = document.getElementById('functional-toggle')?.checked || false;
        
        this.setConsent(analytics || performance || functional);
        this.setPreferences({
            analytics,
            performance,
            functional,
            marketing: false
        });
        
        this.hideConsentBanner();
        this.hidePreferences();
        
        this.showNotification('Privacy preferences saved!', 'success');
    }

    exportData() {
        if (window.analytics) {
            window.analytics.exportData();
            this.showNotification('Your data has been exported!', 'success');
        }
    }

    deleteData() {
        if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
            if (window.analytics) {
                window.analytics.clearData();
            }
            
            // Clear privacy data
            localStorage.removeItem(this.consentKey);
            localStorage.removeItem(this.preferencesKey);
            
            this.showNotification('All your data has been deleted.', 'success');
            
            // Reload page to reset everything
            setTimeout(() => location.reload(), 2000);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `privacy-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Public API
    hasUserConsent() {
        return this.hasConsent === true;
    }

    getUserPreferences() {
        return this.preferences;
    }
}

// Initialize privacy manager
const privacyManager = new PrivacyManager();

// Add CSS styles
const privacyStyles = document.createElement('style');
privacyStyles.textContent = `
    .consent-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #111;
        border-top: 2px solid #00ff88;
        padding: 20px;
        z-index: 10000;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        display: none;
    }

    .consent-banner.show {
        transform: translateY(0);
    }

    .consent-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    }

    .consent-text h3 {
        color: #00ff88;
        margin: 0 0 8px 0;
        font-size: 18px;
    }

    .consent-text p {
        color: #ccc;
        margin: 0;
        font-size: 14px;
        line-height: 1.4;
    }

    .consent-actions {
        display: flex;
        gap: 10px;
        flex-shrink: 0;
    }

    .btn-consent {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
    }

    .btn-accept {
        background: #00ff88;
        color: #000;
    }

    .btn-accept:hover {
        background: #00cc6a;
    }

    .btn-customize {
        background: transparent;
        color: #00ff88;
        border: 1px solid #00ff88;
    }

    .btn-customize:hover {
        background: #00ff88;
        color: #000;
    }

    .btn-decline {
        background: #333;
        color: #ccc;
    }

    .btn-decline:hover {
        background: #444;
    }

    .privacy-controls {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9999;
    }

    .privacy-toggle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #111;
        border: 2px solid #333;
        color: #00ff88;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .privacy-toggle:hover {
        border-color: #00ff88;
        background: #222;
    }

    .preferences-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .preferences-modal.show {
        opacity: 1;
    }

    .preferences-content {
        background: #111;
        border-radius: 12px;
        border: 1px solid #333;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }

    .preferences-modal.show .preferences-content {
        transform: scale(1);
    }

    .preferences-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #333;
    }

    .preferences-header h2 {
        color: #00ff88;
        margin: 0;
    }

    .close-preferences {
        background: none;
        border: none;
        color: #ccc;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-preferences:hover {
        color: #00ff88;
    }

    .preferences-body {
        padding: 20px;
    }

    .preference-section {
        margin-bottom: 25px;
        padding-bottom: 20px;
        border-bottom: 1px solid #222;
    }

    .preference-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }

    .preference-section h3 {
        color: #fff;
        margin: 0 0 8px 0;
        font-size: 16px;
    }

    .preference-section p {
        color: #ccc;
        margin: 0 0 15px 0;
        font-size: 14px;
        line-height: 1.4;
    }

    .preference-toggle {
        display: flex;
        align-items: center;
        cursor: pointer;
        gap: 10px;
    }

    .preference-toggle input[type="checkbox"] {
        display: none;
    }

    .toggle-slider {
        width: 50px;
        height: 24px;
        background: #333;
        border-radius: 12px;
        position: relative;
        transition: background 0.3s ease;
    }

    .toggle-slider::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ccc;
        top: 2px;
        left: 2px;
        transition: all 0.3s ease;
    }

    .preference-toggle input[type="checkbox"]:checked + .toggle-slider {
        background: #00ff88;
    }

    .preference-toggle input[type="checkbox"]:checked + .toggle-slider::before {
        transform: translateX(26px);
        background: #000;
    }

    .preference-toggle input[type="checkbox"]:disabled + .toggle-slider {
        background: #555;
        cursor: not-allowed;
    }

    .preferences-footer {
        padding: 20px;
        border-top: 1px solid #333;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }

    .btn-preferences {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
    }

    .btn-save {
        background: #00ff88;
        color: #000;
    }

    .btn-save:hover {
        background: #00cc6a;
    }

    .btn-accept-all {
        background: transparent;
        color: #00ff88;
        border: 1px solid #00ff88;
    }

    .btn-accept-all:hover {
        background: #00ff88;
        color: #000;
    }

    .privacy-info {
        padding: 20px;
        border-top: 1px solid #333;
        background: #0a0a0a;
    }

    .privacy-info p {
        color: #ccc;
        margin: 0 0 10px 0;
        font-size: 14px;
        font-weight: 500;
    }

    .privacy-info ul {
        color: #aaa;
        margin: 0 0 20px 20px;
        font-size: 13px;
    }

    .privacy-info li {
        margin-bottom: 5px;
    }

    .data-controls {
        display: flex;
        gap: 10px;
        margin-top: 15px;
    }

    .btn-data-control {
        background: #222;
        border: 1px solid #444;
        color: #ccc;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
    }

    .btn-data-control:hover {
        background: #333;
        border-color: #00ff88;
        color: #00ff88;
    }

    .privacy-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: #fff;
        font-size: 14px;
        z-index: 10002;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    }

    .privacy-notification.show {
        transform: translateX(0);
    }

    .privacy-notification.success {
        background: #00ff88;
        color: #000;
    }

    .privacy-notification.info {
        background: #0080ff;
    }

    .privacy-notification.warning {
        background: #ff8800;
    }

    .privacy-notification.error {
        background: #ff4444;
    }

    @media (max-width: 768px) {
        .consent-content {
            flex-direction: column;
            text-align: center;
        }

        .consent-actions {
            width: 100%;
            justify-content: center;
        }

        .preferences-content {
            width: 95%;
            margin: 20px;
        }

        .preferences-footer {
            flex-direction: column;
        }

        .data-controls {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(privacyStyles);