(function () {
    const STORAGE_KEY = 'trijbsEasterEggs.v1';
    const SESSION_BOOT_KEY = 'trijbsEasterEggs.sessionBoot.v1';
    const SESSION_FLAG_PREFIX = 'trijbsEasterEggs.flag.';
    const LAB_PATH = '/lab';
    const GRID_BADGE_ID = 'found-grid';
    const LAB_BADGE_ID = 'entered-lab';
    const CASE_STUDY_BADGE_ID = 'opened-five-case-studies';
    const NAME_SELECTION_FLAG = 'ns1';
    const GRID_SEQUENCE = 'grid';
    const KONAMI_SEQUENCE = [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'b',
        'a'
    ];
    const NAME_SELECTIONS = new Set([
        'Ruben',
        'Ruben Trijbs',
        'trijbs'
    ]);
    const BADGE_DEFINITIONS = {
        [GRID_BADGE_ID]: {
            label: 'Found the Grid',
            unlockedCopy: 'The hidden grid overlay has been traced once.',
            lockedCopy: 'Type the right word and the layout reveals its bones.'
        },
        [LAB_BADGE_ID]: {
            label: 'Entered the Lab',
            unlockedCopy: 'The after-hours room has been opened and visited.',
            lockedCopy: 'There is a route here, but it does not advertise itself.'
        },
        [CASE_STUDY_BADGE_ID]: {
            label: 'Opened 5 Case Studies',
            unlockedCopy: 'Five distinct project details have been opened.',
            lockedCopy: 'Curiosity counts. Five different case studies unlock this.'
        }
    };

    let state = loadState();
    let gridOverlay = null;
    let gridDismissTimer = null;
    let selectionCheckTimer = null;
    let selectionCardTimer = null;
    let konamiIndex = 0;
    let keyBuffer = '';
    let calibrationOverlay = null;
    let calibrationExpiryTimer = null;
    let calibrationCountdownTimer = null;
    let calibrationHits = 0;
    let calibrationDeadline = 0;

    function loadState() {
        const fallbackState = {
            unlockedBadges: [],
            openedProjectSlugs: [],
            labUnlocked: false,
            proofModeSeen: false,
            specialDateLastShown: ''
        };

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return fallbackState;
            }

            const parsed = JSON.parse(raw);
            return {
                unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
                openedProjectSlugs: Array.isArray(parsed.openedProjectSlugs) ? parsed.openedProjectSlugs : [],
                labUnlocked: parsed.labUnlocked === true,
                proofModeSeen: parsed.proofModeSeen === true,
                specialDateLastShown: typeof parsed.specialDateLastShown === 'string' ? parsed.specialDateLastShown : ''
            };
        } catch (error) {
            return fallbackState;
        }
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            // Ignore storage write failures and keep the experience non-blocking.
        }
    }

    function ensureSessionState() {
        if (sessionStorage.getItem(SESSION_BOOT_KEY)) {
            return;
        }

        sessionStorage.setItem(SESSION_BOOT_KEY, String(Date.now()));
    }

    function hasReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function showSecretToast(message) {
        if (!message) {
            return;
        }

        let stack = document.querySelector('[data-secret-toast-stack]');
        if (!stack) {
            stack = document.createElement('div');
            stack.className = 'secret-toast-stack';
            stack.setAttribute('data-secret-toast-stack', '');
            document.body.appendChild(stack);
        }

        const toast = document.createElement('div');
        toast.className = 'secret-toast';
        toast.textContent = message;
        stack.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('is-visible');
        });

        window.setTimeout(() => {
            toast.classList.remove('is-visible');
            window.setTimeout(() => {
                toast.remove();
            }, 220);
        }, 2600);
    }

    function markSessionFlag(flagId) {
        if (!flagId) {
            return;
        }

        sessionStorage.setItem(SESSION_FLAG_PREFIX + flagId, '1');
    }

    function hasSessionFlag(flagId) {
        return sessionStorage.getItem(SESSION_FLAG_PREFIX + flagId) === '1';
    }

    function unlockBadge(badgeId, toastMessage, options = {}) {
        if (!BADGE_DEFINITIONS[badgeId]) {
            return false;
        }

        if (state.unlockedBadges.includes(badgeId)) {
            renderLabState();
            return false;
        }

        state.unlockedBadges.push(badgeId);
        saveState();
        renderLabState();

        if (options.toast !== false) {
            showSecretToast(toastMessage || BADGE_DEFINITIONS[badgeId].label);
        }

        return true;
    }

    function isEditableTarget(target) {
        if (!target) {
            return false;
        }

        const tagName = target.tagName;
        return target.isContentEditable
            || tagName === 'INPUT'
            || tagName === 'TEXTAREA'
            || tagName === 'SELECT';
    }

    function normalizeKey(key) {
        if (typeof key !== 'string' || !key) {
            return '';
        }

        return key.length === 1 ? key.toLowerCase() : key;
    }

    function getCurrentPath() {
        const path = window.location.pathname.replace(/\/+$/, '');
        return path || '/';
    }

    function isLabPage() {
        const currentPath = getCurrentPath();
        return currentPath === LAB_PATH || currentPath === LAB_PATH + '.html';
    }

    function createGridOverlay() {
        if (gridOverlay) {
            return gridOverlay;
        }

        const columnsMarkup = Array.from({ length: 12 }, () => '<span></span>').join('');
        gridOverlay = document.createElement('div');
        gridOverlay.className = 'secret-grid-overlay';
        gridOverlay.hidden = true;
        gridOverlay.setAttribute('aria-hidden', 'true');
        gridOverlay.innerHTML = `
            <div class="secret-grid-panel" data-grid-panel="hero">
                <div class="secret-grid-columns">${columnsMarkup}</div>
                <div class="secret-grid-callout secret-grid-callout--top">hero rhythm</div>
                <div class="secret-grid-callout secret-grid-callout--bottom">12-column frame</div>
            </div>
            <div class="secret-grid-panel" data-grid-panel="projects">
                <div class="secret-grid-columns">${columnsMarkup}</div>
                <div class="secret-grid-callout secret-grid-callout--top">project rail</div>
                <div class="secret-grid-callout secret-grid-callout--bottom">spacing system</div>
            </div>
        `;
        document.body.appendChild(gridOverlay);
        return gridOverlay;
    }

    function positionGridOverlay() {
        if (!gridOverlay || gridOverlay.hidden) {
            return;
        }

        const docHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            window.innerHeight
        );

        gridOverlay.style.height = docHeight + 'px';

        const sections = [
            { panel: 'hero', selector: '#hero' },
            { panel: 'projects', selector: '#projects' }
        ];

        sections.forEach(({ panel, selector }) => {
            const section = document.querySelector(selector);
            const panelElement = gridOverlay.querySelector('[data-grid-panel="' + panel + '"]');

            if (!section || !panelElement) {
                return;
            }

            const rect = section.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const left = rect.left + window.scrollX;

            panelElement.style.top = top + 'px';
            panelElement.style.left = left + 'px';
            panelElement.style.width = rect.width + 'px';
            panelElement.style.height = rect.height + 'px';
        });
    }

    function closeGridMode() {
        if (!gridOverlay) {
            return;
        }

        gridOverlay.hidden = true;
        document.body.classList.remove('secret-grid-active');

        if (gridDismissTimer) {
            clearTimeout(gridDismissTimer);
            gridDismissTimer = null;
        }
    }

    function openGridMode() {
        if (!document.querySelector('#hero') && !document.querySelector('#projects')) {
            return;
        }

        const overlay = createGridOverlay();

        overlay.hidden = false;
        document.body.classList.add('secret-grid-active');
        positionGridOverlay();

        if (gridDismissTimer) {
            clearTimeout(gridDismissTimer);
        }

        gridDismissTimer = window.setTimeout(() => {
            closeGridMode();
        }, 20000);

        unlockBadge(GRID_BADGE_ID, 'grid located');
    }

    function toggleGridMode() {
        if (gridOverlay && !gridOverlay.hidden) {
            closeGridMode();
            return;
        }

        openGridMode();
    }

    function createSelectionCard() {
        let card = document.querySelector('[data-secret-selection-card]');
        if (card) {
            return card;
        }

        card = document.createElement('div');
        card.className = 'secret-selection-card';
        card.hidden = true;
        card.setAttribute('data-secret-selection-card', '');
        card.innerHTML = `
            <img src="/media/profile-hero-480.jpg" alt="Portrait of Ruben Trijbels">
            <div class="secret-selection-copy">
                <span class="secret-selection-label">designer located</span>
                <p>Still here. Usually adjusting spacing.</p>
            </div>
        `;
        document.body.appendChild(card);
        return card;
    }

    function showSelectionCard(rect) {
        const card = createSelectionCard();
        const maxLeft = Math.max(20, window.innerWidth - 240);
        const maxTop = Math.max(20, window.innerHeight - 140);
        const preferredLeft = rect.left + Math.max(rect.width / 2, 20) - 108;
        const preferredTop = rect.bottom + 18;
        const top = Math.min(maxTop, Math.max(20, preferredTop));
        const left = Math.min(maxLeft, Math.max(20, preferredLeft));

        card.style.top = top + 'px';
        card.style.left = left + 'px';
        card.hidden = false;

        requestAnimationFrame(() => {
            card.classList.add('is-visible');
        });

        if (selectionCardTimer) {
            clearTimeout(selectionCardTimer);
        }

        selectionCardTimer = window.setTimeout(() => {
            card.classList.remove('is-visible');
            window.setTimeout(() => {
                card.hidden = true;
            }, 180);
        }, 3600);
    }

    function maybeShowSelectionSecret() {
        if (hasSessionFlag(NAME_SELECTION_FLAG)) {
            return;
        }

        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !selection.rangeCount) {
            return;
        }

        const text = selection.toString().trim();
        if (!NAME_SELECTIONS.has(text)) {
            return;
        }

        const rect = selection.getRangeAt(0).getBoundingClientRect();
        if (!rect.width && !rect.height) {
            return;
        }

        markSessionFlag(NAME_SELECTION_FLAG);
        showSelectionCard(rect);
    }

    function playShuffleAnimation() {
        const flash = document.createElement('div');
        flash.className = 'secret-shuffle-flash';
        flash.setAttribute('aria-hidden', 'true');
        flash.innerHTML = '<span></span><span></span><span></span><span></span>';
        document.body.appendChild(flash);

        window.setTimeout(() => {
            flash.remove();
        }, 1100);
    }

    function createCalibrationOverlay() {
        if (calibrationOverlay) {
            return calibrationOverlay;
        }

        calibrationOverlay = document.createElement('div');
        calibrationOverlay.className = 'secret-calibration-overlay';
        calibrationOverlay.hidden = true;
        calibrationOverlay.innerHTML = `
            <div class="secret-calibration-panel" role="dialog" aria-modal="true" aria-labelledby="secretCalibrationTitle">
                <span class="mini-label">studio calibration</span>
                <h3 id="secretCalibrationTitle">Trace the drifting marks before they disappear.</h3>
                <p>Three marks. Ten quiet seconds.</p>
                <div class="secret-calibration-meta">
                    <span data-calibration-hits>0 / 3</span>
                    <span data-calibration-time>10s</span>
                </div>
                <div class="secret-calibration-arena" data-calibration-arena></div>
            </div>
        `;
        document.body.appendChild(calibrationOverlay);
        return calibrationOverlay;
    }

    function buildCalibrationTokens() {
        const overlay = createCalibrationOverlay();
        const arena = overlay.querySelector('[data-calibration-arena]');
        const labels = ['grid', 'type', 'pace'];

        if (!arena) {
            return;
        }

        arena.innerHTML = '';

        labels.forEach((label, index) => {
            const token = document.createElement('button');
            token.type = 'button';
            token.className = 'secret-calibration-token';
            token.textContent = label;
            token.style.top = (18 + index * 22) + '%';
            token.style.left = (14 + index * 25) + '%';
            token.style.setProperty('--drift-x', (index % 2 === 0 ? 18 : -22) + 'px');
            token.style.setProperty('--drift-y', (index === 1 ? -20 : 16) + 'px');
            token.style.setProperty('--drift-duration', (3.8 + index * 0.7) + 's');

            token.addEventListener('click', () => {
                if (token.classList.contains('is-captured')) {
                    return;
                }

                token.classList.add('is-captured');
                token.disabled = true;
                calibrationHits += 1;
                updateCalibrationMeta();

                if (calibrationHits >= labels.length) {
                    handleCalibrationSuccess();
                }
            });

            arena.appendChild(token);
        });
    }

    function updateCalibrationMeta() {
        if (!calibrationOverlay) {
            return;
        }

        const hitsElement = calibrationOverlay.querySelector('[data-calibration-hits]');
        const timeElement = calibrationOverlay.querySelector('[data-calibration-time]');

        if (hitsElement) {
            hitsElement.textContent = calibrationHits + ' / 3';
        }

        if (timeElement) {
            const secondsRemaining = Math.max(0, Math.ceil((calibrationDeadline - Date.now()) / 1000));
            timeElement.textContent = secondsRemaining + 's';
        }
    }

    function clearCalibrationTimers() {
        if (calibrationExpiryTimer) {
            clearTimeout(calibrationExpiryTimer);
            calibrationExpiryTimer = null;
        }

        if (calibrationCountdownTimer) {
            clearInterval(calibrationCountdownTimer);
            calibrationCountdownTimer = null;
        }
    }

    function closeCalibrationOverlay() {
        if (!calibrationOverlay) {
            return;
        }

        clearCalibrationTimers();
        calibrationOverlay.classList.remove('is-open', 'is-success');

        window.setTimeout(() => {
            if (calibrationOverlay) {
                calibrationOverlay.hidden = true;
            }
        }, 180);
    }

    function handleCalibrationSuccess() {
        if (!calibrationOverlay || calibrationOverlay.classList.contains('is-success')) {
            return;
        }

        clearCalibrationTimers();
        calibrationOverlay.classList.add('is-success');
        state.labUnlocked = true;
        saveState();
        showSecretToast('lab unlocked');
        playShuffleAnimation();

        window.setTimeout(() => {
            if (isLabPage()) {
                closeCalibrationOverlay();
                renderLabState();
                return;
            }

            window.location.href = LAB_PATH;
        }, 900);
    }

    function openCalibrationOverlay() {
        if (calibrationOverlay && !calibrationOverlay.hidden) {
            return;
        }

        const overlay = createCalibrationOverlay();

        clearCalibrationTimers();
        calibrationHits = 0;
        calibrationDeadline = Date.now() + 10000;
        buildCalibrationTokens();
        updateCalibrationMeta();
        overlay.hidden = false;
        overlay.classList.add('is-open');

        calibrationCountdownTimer = window.setInterval(updateCalibrationMeta, 250);
        calibrationExpiryTimer = window.setTimeout(() => {
            closeCalibrationOverlay();
        }, 10000);
    }

    function recordCaseStudyOpen(projectId) {
        if (!projectId || state.openedProjectSlugs.includes(projectId)) {
            renderLabState();
            return;
        }

        state.openedProjectSlugs.push(projectId);
        saveState();

        if (state.openedProjectSlugs.length >= 5) {
            unlockBadge(CASE_STUDY_BADGE_ID, 'five studies opened');
        } else {
            renderLabState();
        }
    }

    function getAmsterdamDateParts() {
        const formatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Europe/Amsterdam',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const parts = formatter.formatToParts(new Date()).reduce((accumulator, part) => {
            if (part.type !== 'literal') {
                accumulator[part.type] = part.value;
            }
            return accumulator;
        }, {});

        return {
            monthDay: parts.month + '-' + parts.day,
            fullDate: parts.year + '-' + parts.month + '-' + parts.day
        };
    }

    function maybeRunSpecialDateScene() {
        if (hasReducedMotion()) {
            return;
        }

        const { monthDay, fullDate } = getAmsterdamDateParts();
        const sceneMap = {
            '01-01': 'fresh-canvas',
            '04-27': 'kings-day',
            '12-31': 'midnight-proof'
        };
        const sceneId = sceneMap[monthDay];

        if (!sceneId || state.specialDateLastShown === fullDate + ':' + sceneId) {
            return;
        }

        const scene = document.createElement('div');
        scene.className = 'special-date-scene special-date-scene--' + sceneId;
        scene.setAttribute('aria-hidden', 'true');
        scene.innerHTML = `
            <span class="special-date-mark special-date-mark--one"></span>
            <span class="special-date-mark special-date-mark--two"></span>
            <span class="special-date-mark special-date-mark--three"></span>
            <span class="special-date-mark special-date-mark--four"></span>
        `;
        document.body.appendChild(scene);

        state.specialDateLastShown = fullDate + ':' + sceneId;
        saveState();

        window.setTimeout(() => {
            scene.remove();
        }, 6200);
    }

    function renderLabState() {
        const badgeCards = document.querySelectorAll('[data-lab-badge]');
        badgeCards.forEach((card) => {
            const badgeId = card.getAttribute('data-lab-badge');
            const badge = BADGE_DEFINITIONS[badgeId];
            const isUnlocked = state.unlockedBadges.includes(badgeId);

            card.classList.toggle('is-unlocked', isUnlocked);
            card.classList.toggle('is-locked', !isUnlocked);

            const status = card.querySelector('[data-lab-status]');
            const detail = card.querySelector('[data-lab-detail]');

            if (status) {
                status.textContent = isUnlocked ? 'Collected' : 'Hidden';
            }

            if (detail && badge) {
                detail.textContent = isUnlocked ? badge.unlockedCopy : badge.lockedCopy;
            }
        });

        const count = document.querySelector('[data-lab-badge-count]');
        if (count) {
            count.textContent = String(state.unlockedBadges.length);
        }

        const routeStatus = document.querySelector('[data-lab-route-status]');
        if (routeStatus) {
            routeStatus.textContent = state.labUnlocked ? 'route traced' : 'still unlisted';
        }

        const caseStudyProgress = document.querySelector('[data-lab-case-study-progress]');
        if (caseStudyProgress) {
            const total = Math.min(state.openedProjectSlugs.length, 5);
            caseStudyProgress.textContent = total + ' / 5 case studies opened';
        }
    }

    function maybeUnlockLabBadge() {
        if (!isLabPage()) {
            return;
        }

        state.labUnlocked = true;
        saveState();
        unlockBadge(LAB_BADGE_ID, 'entered the lab');
    }

    function enterProofMode() {
        if (!window.TrijbsThemeController) {
            return;
        }

        const currentTheme = window.TrijbsThemeController.getTheme();
        const baseTheme = currentTheme === 'proof'
            ? window.TrijbsThemeController.getBaseTheme()
            : (currentTheme === 'dark' ? 'dark' : 'poster');

        state.proofModeSeen = true;
        saveState();

        window.TrijbsThemeController.setTheme('proof', {
            persist: true,
            trackAnalytics: true,
            baseTheme
        });

        showSecretToast('proof mode');
    }

    function setupProofLongPress() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) {
            return;
        }

        let holdTimer = null;

        const clearHold = () => {
            if (holdTimer) {
                clearTimeout(holdTimer);
                holdTimer = null;
            }
            themeToggle.classList.remove('is-arming-proof');
        };

        themeToggle.addEventListener('pointerdown', (event) => {
            if (event.pointerType === 'mouse' && event.button !== 0) {
                return;
            }

            clearHold();
            themeToggle.classList.add('is-arming-proof');
            holdTimer = window.setTimeout(() => {
                themeToggle.dataset.proofConsumed = 'true';
                clearHold();
                enterProofMode();
            }, 1200);
        });

        themeToggle.addEventListener('pointerup', clearHold);
        themeToggle.addEventListener('pointerleave', clearHold);
        themeToggle.addEventListener('pointercancel', clearHold);

        themeToggle.addEventListener('click', (event) => {
            if (themeToggle.dataset.proofConsumed !== 'true') {
                return;
            }

            delete themeToggle.dataset.proofConsumed;
            event.preventDefault();
            event.stopImmediatePropagation();
        }, true);
    }

    function setupKeyboardSecrets() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeGridMode();
                closeCalibrationOverlay();
                return;
            }

            if (isEditableTarget(document.activeElement) || event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }

            const key = normalizeKey(event.key);
            if (!key) {
                return;
            }

            const expectedKonamiKey = KONAMI_SEQUENCE[konamiIndex];
            if (key === expectedKonamiKey) {
                konamiIndex += 1;
                if (konamiIndex === KONAMI_SEQUENCE.length) {
                    konamiIndex = 0;
                    openCalibrationOverlay();
                }
            } else {
                konamiIndex = key === KONAMI_SEQUENCE[0] ? 1 : 0;
            }

            if (/^[a-z]$/.test(key)) {
                keyBuffer = (keyBuffer + key).slice(-GRID_SEQUENCE.length);
                if (keyBuffer === GRID_SEQUENCE) {
                    keyBuffer = '';
                    toggleGridMode();
                }
            } else {
                keyBuffer = '';
            }
        });

        window.addEventListener('resize', positionGridOverlay);
    }

    function setupSelectionSecret() {
        document.addEventListener('selectionchange', () => {
            if (selectionCheckTimer) {
                clearTimeout(selectionCheckTimer);
            }

            selectionCheckTimer = window.setTimeout(maybeShowSelectionSecret, 120);
        });
    }

    function setupProjectTracking() {
        document.addEventListener('trijbs:projectdetailsopen', (event) => {
            const projectId = event.detail?.projectId;
            recordCaseStudyOpen(projectId);
        });

        if (state.openedProjectSlugs.length >= 5 && !state.unlockedBadges.includes(CASE_STUDY_BADGE_ID)) {
            unlockBadge(CASE_STUDY_BADGE_ID, '', { toast: false });
        }
    }

    function init() {
        ensureSessionState();
        setupProofLongPress();
        setupKeyboardSecrets();
        setupSelectionSecret();
        setupProjectTracking();
        maybeUnlockLabBadge();
        renderLabState();
        maybeRunSpecialDateScene();

        window.TrijbsEasterEggs = {
            getState() {
                return {
                    ...state
                };
            },
            enterProofMode,
            recordCaseStudyOpen,
            renderLabState
        };
    }

    document.addEventListener('DOMContentLoaded', init);
}());
