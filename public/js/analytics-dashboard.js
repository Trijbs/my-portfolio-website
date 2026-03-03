(() => {
    'use strict';

    const REFRESH_INTERVAL_MS = 15000;
    const SUMMARY_URL = '/api/analytics?action=summary';
    const EVENTS_URL = '/api/analytics?action=events&limit=150';
    const HEALTH_URL = '/api/analytics?action=health';
    const AUTH_URL = '/api/analytics-auth';

    const dashboard = {
        refreshTimer: null,
        authenticated: false,

        async init() {
            this.cacheElements();
            this.bindEvents();
            await this.checkAuthState();
        },

        cacheElements() {
            this.elements = {
                statusText: document.getElementById('analyticsStatusText'),
                statusDot: document.getElementById('analyticsStatusDot'),
                lastUpdated: document.getElementById('analyticsLastUpdated'),
                totalEvents: document.getElementById('analyticsTotalEvents'),
                todayEvents: document.getElementById('analyticsTodayEvents'),
                activeSessions: document.getElementById('analyticsActiveSessions'),
                totalUsers: document.getElementById('analyticsTotalUsers'),
                avgDuration: document.getElementById('analyticsAvgDuration'),
                topEvents: document.getElementById('analyticsTopEvents'),
                topPages: document.getElementById('analyticsTopPages'),
                recentEvents: document.getElementById('analyticsRecentEvents'),
                deviceSplit: document.getElementById('analyticsDeviceSplit'),
                rawJson: document.getElementById('analyticsRawJson'),
                refreshButton: document.getElementById('analyticsRefreshButton'),
                logoutButton: document.getElementById('analyticsLogoutButton'),
                authPanel: document.getElementById('analyticsAuthPanel'),
                dashboardGrid: document.getElementById('analyticsDashboardGrid'),
                authForm: document.getElementById('analyticsAuthForm'),
                authMessage: document.getElementById('analyticsAuthMessage'),
                passwordInput: document.getElementById('analyticsPassword'),
                storageNote: document.getElementById('analyticsStorageNote')
            };
        },

        bindEvents() {
            this.elements.refreshButton?.addEventListener('click', () => {
                this.refresh();
            });

            this.elements.logoutButton?.addEventListener('click', async () => {
                await fetch(AUTH_URL, {
                    method: 'DELETE',
                    credentials: 'same-origin'
                });

                this.authenticated = false;
                this.stopRefreshing();
                this.showAuthPanel('Enter the admin password to view live analytics on this domain.');
            });

            this.elements.authForm?.addEventListener('submit', async (event) => {
                event.preventDefault();

                const password = this.elements.passwordInput.value.trim();
                if (!password) {
                    this.showAuthPanel('Enter a password before submitting.');
                    return;
                }

                this.showAuthPanel('Checking password…');

                try {
                    const response = await fetch(AUTH_URL, {
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ password })
                    });

                    const data = await response.json();
                    if (!response.ok || !data.success) {
                        this.showAuthPanel(data.message || 'Password rejected.');
                        this.elements.passwordInput.select();
                        return;
                    }

                    this.elements.passwordInput.value = '';
                    this.hideAuthPanel();
                    await this.refresh();
                    this.startRefreshing();
                } catch (error) {
                    this.showAuthPanel('Auth request failed. Try again.');
                }
            });
        },

        async checkAuthState() {
            try {
                const response = await fetch(AUTH_URL, {
                    credentials: 'same-origin'
                });
                const data = await response.json();

                if (!data.configured) {
                    this.showAuthPanel(
                        'Set ANALYTICS_ADMIN_PASSWORD in Vercel to unlock this page. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for persistent storage.'
                    );
                    this.elements.authForm.hidden = true;
                    this.setStatus('Setup Needed', false);
                    return;
                }

                this.elements.authForm.hidden = false;

                if (!data.authenticated) {
                    this.showAuthPanel('Enter the admin password to view live analytics on this domain.');
                    this.setStatus('Locked', false);
                    return;
                }

                this.hideAuthPanel();
                await this.refresh();
                this.startRefreshing();
            } catch (error) {
                this.showAuthPanel('Auth check failed. Refresh the page and try again.');
                this.setStatus('Unavailable', false);
            }
        },

        startRefreshing() {
            this.stopRefreshing();
            this.refreshTimer = window.setInterval(() => {
                this.refresh();
            }, REFRESH_INTERVAL_MS);
        },

        stopRefreshing() {
            if (this.refreshTimer) {
                window.clearInterval(this.refreshTimer);
                this.refreshTimer = null;
            }
        },

        showAuthPanel(message) {
            this.elements.authPanel.hidden = false;
            this.elements.dashboardGrid.hidden = true;
            this.elements.logoutButton.hidden = true;
            this.elements.authMessage.textContent = message;
        },

        hideAuthPanel() {
            this.authenticated = true;
            this.elements.authPanel.hidden = true;
            this.elements.dashboardGrid.hidden = false;
            this.elements.logoutButton.hidden = false;
        },

        async refresh() {
            this.setStatus('Refreshing…', false);

            try {
                const [summaryResponse, eventsResponse, healthResponse] = await Promise.all([
                    fetch(SUMMARY_URL, { credentials: 'same-origin' }),
                    fetch(EVENTS_URL, { credentials: 'same-origin' }),
                    fetch(HEALTH_URL, { credentials: 'same-origin' })
                ]);

                if ([summaryResponse, eventsResponse, healthResponse].some((response) => response.status === 401)) {
                    this.authenticated = false;
                    this.stopRefreshing();
                    this.showAuthPanel('Session expired. Enter the analytics password again.');
                    this.setStatus('Locked', false);
                    return;
                }

                const [summaryData, eventsData, healthData] = await Promise.all([
                    summaryResponse.json(),
                    eventsResponse.json(),
                    healthResponse.json()
                ]);

                if (!summaryResponse.ok || !eventsResponse.ok || !healthResponse.ok) {
                    throw new Error(summaryData.message || eventsData.message || healthData.message || 'Dashboard request failed');
                }

                this.render(summaryData.summary || {}, eventsData.events || [], healthData || {});
                this.hideAuthPanel();
                this.setStatus('Live', true);
                this.elements.lastUpdated.textContent = new Date().toLocaleTimeString();
            } catch (error) {
                this.setStatus('Unavailable', false);
                this.renderError(error);
            }
        },

        setStatus(label, healthy) {
            this.elements.statusText.textContent = label;
            this.elements.statusDot.dataset.healthy = healthy ? 'true' : 'false';
        },

        render(summary, events, health) {
            const topPages = Object.entries(summary.topPages || {})
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([path, count]) => ({
                    label: path,
                    value: `${count} hits`
                }));
            const topEvents = Object.entries(summary.topEvents || {})
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6);

            this.elements.totalEvents.textContent = this.formatNumber(summary.totalEvents || 0);
            this.elements.todayEvents.textContent = this.formatNumber(summary.todayEvents || 0);
            this.elements.activeSessions.textContent = this.formatNumber(summary.totalSessions || 0);
            this.elements.totalUsers.textContent = this.formatNumber(summary.totalUsers || 0);
            this.elements.avgDuration.textContent = `${Math.round((summary.avgSessionDuration || 0) / 1000)}s`;
            this.elements.storageNote.textContent = `Storage: ${health.storage || 'unknown'}${health.persistent ? ' (persistent)' : ' (ephemeral fallback)'}`;

            this.renderList(
                this.elements.topEvents,
                topEvents.map(([name, count]) => ({
                    label: this.humanizeEventName(name),
                    value: `${count} events`
                })),
                'No event data yet.'
            );

            this.renderList(this.elements.topPages, topPages, 'No page views tracked yet.');
            this.renderList(this.elements.deviceSplit, this.summarizeDevices(events), 'No device breakdown yet.');
            this.renderRecentEvents(events);
            this.elements.rawJson.textContent = JSON.stringify(
                {
                    summary,
                    health,
                    sampleEvents: events.slice(0, 10)
                },
                null,
                2
            );
        },

        renderRecentEvents(events) {
            if (!events.length) {
                this.elements.recentEvents.innerHTML = '<p class="analytics-empty">No events received yet.</p>';
                return;
            }

            this.elements.recentEvents.innerHTML = events.slice(0, 20).map((event) => `
                <article class="analytics-event">
                    <div class="analytics-event-head">
                        <strong>${this.escapeHtml(this.humanizeEventName(event.eventType || 'event'))}</strong>
                        <span>${new Date(event.timestamp || Date.now()).toLocaleString()}</span>
                    </div>
                    <p>${this.escapeHtml(event.path || event.page || event.url || 'Unknown path')}</p>
                </article>
            `).join('');
        },

        renderList(container, items, emptyMessage) {
            if (!items.length) {
                container.innerHTML = `<p class="analytics-empty">${emptyMessage}</p>`;
                return;
            }

            container.innerHTML = items.map((item) => `
                <div class="analytics-list-row">
                    <span>${this.escapeHtml(item.label)}</span>
                    <strong>${this.escapeHtml(item.value)}</strong>
                </div>
            `).join('');
        },

        renderError(error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.elements.recentEvents.innerHTML = `<p class="analytics-empty">Dashboard refresh failed: ${this.escapeHtml(message)}</p>`;
        },

        summarizeDevices(events) {
            let desktop = 0;
            let tablet = 0;
            let mobile = 0;

            events.forEach((event) => {
                const width = event.deviceInfo?.windowWidth;
                if (!width) {
                    return;
                }

                if (width >= 1024) {
                    desktop += 1;
                } else if (width >= 768) {
                    tablet += 1;
                } else {
                    mobile += 1;
                }
            });

            return [
                { label: 'Desktop', value: `${desktop}` },
                { label: 'Tablet', value: `${tablet}` },
                { label: 'Mobile', value: `${mobile}` }
            ].filter((item) => item.value !== '0');
        },

        humanizeEventName(name) {
            return String(name)
                .replace(/[_-]+/g, ' ')
                .replace(/\b\w/g, (match) => match.toUpperCase());
        },

        formatNumber(value) {
            return new Intl.NumberFormat('en-US').format(value);
        },

        escapeHtml(value) {
            return String(value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        dashboard.init();
    });
})();
