(() => {
    'use strict';

    const REFRESH_INTERVAL_MS = 15000;
    const SUMMARY_URL = '/api/analytics?action=summary';
    const EVENTS_URL = '/api/analytics?action=events&limit=150';
    const HEALTH_URL = '/api/analytics?action=health';

    const dashboard = {
        refreshTimer: null,

        async init() {
            this.cacheElements();
            this.bindEvents();
            await this.refresh();
            this.refreshTimer = window.setInterval(() => {
                this.refresh();
            }, REFRESH_INTERVAL_MS);
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
                refreshButton: document.getElementById('analyticsRefreshButton')
            };
        },

        bindEvents() {
            this.elements.refreshButton?.addEventListener('click', () => {
                this.refresh();
            });
        },

        async refresh() {
            this.setStatus('Refreshing…', false);

            try {
                const [summaryResponse, eventsResponse, healthResponse] = await Promise.all([
                    fetch(SUMMARY_URL, { credentials: 'same-origin' }),
                    fetch(EVENTS_URL, { credentials: 'same-origin' }),
                    fetch(HEALTH_URL, { credentials: 'same-origin' })
                ]);

                const [summaryData, eventsData, healthData] = await Promise.all([
                    summaryResponse.json(),
                    eventsResponse.json(),
                    healthResponse.json()
                ]);

                this.render(summaryData.summary || {}, eventsData.events || [], healthData || {});
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
            const deviceSummary = this.summarizeDevices(events);
            const topPages = this.summarizePages(events);
            const topEvents = Object.entries(summary.topEvents || {})
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6);

            this.elements.totalEvents.textContent = this.formatNumber(summary.totalEvents || 0);
            this.elements.todayEvents.textContent = this.formatNumber(summary.todayEvents || 0);
            this.elements.activeSessions.textContent = this.formatNumber(summary.totalSessions || 0);
            this.elements.totalUsers.textContent = this.formatNumber(summary.totalUsers || 0);
            this.elements.avgDuration.textContent = `${Math.round((summary.avgSessionDuration || 0) / 1000)}s`;

            this.renderList(
                this.elements.topEvents,
                topEvents.map(([name, count]) => ({
                    label: this.humanizeEventName(name),
                    value: `${count} events`
                })),
                'No event data yet.'
            );

            this.renderList(
                this.elements.topPages,
                topPages,
                'No page views tracked yet.'
            );

            this.renderList(
                this.elements.deviceSplit,
                deviceSummary,
                'No device breakdown yet.'
            );

            this.renderRecentEvents(events);
            this.elements.rawJson.textContent = JSON.stringify({
                summary,
                health,
                sampleEvents: events.slice(0, 10)
            }, null, 2);
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

        summarizePages(events) {
            const counts = new Map();

            events.forEach((event) => {
                const key = event.path || event.page || event.url;
                if (!key) {
                    return;
                }

                counts.set(key, (counts.get(key) || 0) + 1);
            });

            return Array.from(counts.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([path, count]) => ({
                    label: path,
                    value: `${count} hits`
                }));
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
