// Main JavaScript functionality
// Combines functionality for improved user experience

const PROJECT_DETAILS_URL = 'data/project-details.json';
const DETAIL_IMAGE_WIDTHS = [768, 1280, 1600];

let projectDetailsById = null;
let projectDetailsPromise = null;
let projectDetailsRequestId = 0;

function replaceFeatherIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

function parseImageAsset(src) {
    if (!src || typeof src !== 'string') {
        return null;
    }

    const normalizedSrc = src.replace(/^\/+/, '');
    if (!normalizedSrc.startsWith('img/')) {
        return null;
    }

    const match = normalizedSrc.slice(4).match(/^(.*)\.([a-z0-9]+)$/i);
    if (!match) {
        return null;
    }

    const extension = match[2].toLowerCase() === 'jpeg' ? 'jpg' : match[2].toLowerCase();
    return {
        baseName: match[1],
        extension
    };
}

function getCandidateWidths(sourceWidth, preferredWidths) {
    const widths = Array.isArray(preferredWidths) ? [...preferredWidths] : [];
    const numericWidth = Number(sourceWidth);

    if (Number.isFinite(numericWidth) && numericWidth > 0) {
        const filteredWidths = widths.filter(width => width <= numericWidth);
        if (!filteredWidths.includes(numericWidth)) {
            filteredWidths.push(numericWidth);
        }
        return Array.from(new Set(filteredWidths)).sort((left, right) => left - right);
    }

    return Array.from(new Set(widths)).sort((left, right) => left - right);
}

function buildSizedImageUrl(src, width, format) {
    const asset = parseImageAsset(src);
    if (!asset || !width) {
        return src;
    }

    const resolvedFormat = format || asset.extension;
    return 'media/' + asset.baseName + '-' + width + '.' + resolvedFormat;
}

function getPosterImageUrl(item) {
    if (!item?.poster) {
        return '';
    }

    const posterWidths = getCandidateWidths(item.posterWidth, DETAIL_IMAGE_WIDTHS);
    return posterWidths.length
        ? buildSizedImageUrl(item.poster, posterWidths[posterWidths.length - 1])
        : item.poster;
}

function getZoomImageUrl(item) {
    const detailWidths = getCandidateWidths(item.width, DETAIL_IMAGE_WIDTHS);
    return detailWidths.length
        ? buildSizedImageUrl(item.src, detailWidths[detailWidths.length - 1])
        : item.src;
}

function renderResponsivePicture(item, options = {}) {
    const asset = parseImageAsset(item?.src);
    const imageAlt = escapeHTML(item?.alt || '');
    const sizes = escapeHTML(options.sizes || '100vw');
    const loading = options.loading || 'lazy';
    const decoding = options.decoding || 'async';
    const fetchPriority = options.fetchPriority || '';
    const className = options.className ? ' class="' + escapeHTML(options.className) + '"' : '';
    const widthAttr = item?.width ? ' width="' + item.width + '"' : '';
    const heightAttr = item?.height ? ' height="' + item.height + '"' : '';
    const loadingAttr = loading ? ' loading="' + escapeHTML(loading) + '"' : '';
    const decodingAttr = decoding ? ' decoding="' + escapeHTML(decoding) + '"' : '';
    const fetchPriorityAttr = fetchPriority ? ' fetchpriority="' + escapeHTML(fetchPriority) + '"' : '';

    if (!asset) {
        return '<img src="' + escapeHTML(item?.src || '') + '" alt="' + imageAlt + '"' + widthAttr + heightAttr + loadingAttr + decodingAttr + fetchPriorityAttr + '>';
    }

    const candidateWidths = getCandidateWidths(item.width, options.widths || DETAIL_IMAGE_WIDTHS);
    if (!candidateWidths.length) {
        return '<img src="' + escapeHTML(item.src) + '" alt="' + imageAlt + '"' + widthAttr + heightAttr + loadingAttr + decodingAttr + fetchPriorityAttr + '>';
    }

    const sourceTags = ['avif', 'webp'].map(format => {
        const srcset = candidateWidths
            .map(width => buildSizedImageUrl(item.src, width, format) + ' ' + width + 'w')
            .join(', ');

        return '<source type="image/' + format + '" srcset="' + escapeHTML(srcset) + '" sizes="' + sizes + '">';
    }).join('');

    const fallbackSrcset = candidateWidths
        .map(width => buildSizedImageUrl(item.src, width, asset.extension) + ' ' + width + 'w')
        .join(', ');
    const fallbackSrc = buildSizedImageUrl(item.src, candidateWidths[candidateWidths.length - 1], asset.extension);

    return '<picture' + className + '>' +
        sourceTags +
        '<img src="' + escapeHTML(fallbackSrc) + '" srcset="' + escapeHTML(fallbackSrcset) + '" sizes="' + sizes + '" alt="' + imageAlt + '"' + widthAttr + heightAttr + loadingAttr + decodingAttr + fetchPriorityAttr + '>' +
        '</picture>';
}

async function loadProjectDetails() {
    if (projectDetailsById) {
        return projectDetailsById;
    }

    if (!projectDetailsPromise) {
        projectDetailsPromise = fetch(PROJECT_DETAILS_URL, {
            credentials: 'same-origin'
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Unable to load project details.');
                }

                const payload = await response.json();
                if (!Array.isArray(payload)) {
                    throw new Error('Project details payload is invalid.');
                }

                projectDetailsById = payload.reduce((index, project) => {
                    if (project?.slug) {
                        index[project.slug] = project;
                    }
                    return index;
                }, {});

                return projectDetailsById;
            })
            .catch(error => {
                projectDetailsPromise = null;
                throw error;
            });
    }

    return projectDetailsPromise;
}

function renderProjectDetailsLoading(projectTitle) {
    return '<div class="project-details-loading" role="status" aria-live="polite"><p>Loading ' + escapeHTML(projectTitle || 'project details') + '...</p></div>';
}

function renderProjectDetailsError(message) {
    return '<div class="project-details-error" role="alert"><p>' + escapeHTML(message || 'Project details could not be loaded right now.') + '</p></div>';
}

// Escape HTML special characters in a string
function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function isLocalDevelopmentHost(hostname = '') {
    const normalized = String(hostname).toLowerCase();
    return normalized === 'localhost'
        || normalized === '127.0.0.1'
        || normalized === '::1'
        || normalized.endsWith('.localhost');
}

function toSafeHttpUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') {
        return null;
    }

    try {
        const parsed = new URL(rawUrl.trim(), window.location.origin);
        if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
            return null;
        }

        if (parsed.protocol === 'http:' && !isLocalDevelopmentHost(parsed.hostname)) {
            return null;
        }

        return parsed.href;
    } catch (error) {
        return null;
    }
}

function detectSocialPlatform(rawUrl) {
    const safeUrl = toSafeHttpUrl(rawUrl);
    if (!safeUrl) {
        return null;
    }

    const hostname = new URL(safeUrl).hostname.toLowerCase();
    if (hostname === 'github.com' || hostname.endsWith('.github.com')) {
        return 'github';
    }

    if (hostname === 'instagram.com' || hostname === 'www.instagram.com' || hostname.endsWith('.instagram.com')) {
        return 'instagram';
    }

    if (hostname === 'linkedin.com' || hostname === 'www.linkedin.com' || hostname.endsWith('.linkedin.com')) {
        return 'linkedin';
    }

    return null;
}

function renderProjectMediaItem(item, projectTitle, options = {}) {
    const frame = item.frame ? ` media-frame--${escapeHTML(item.frame)}` : '';
    const slideFrame = item.frame ? ` collection-slide--${escapeHTML(item.frame)}` : '';
    const caption = item.caption ? `<figcaption>${escapeHTML(item.caption)}</figcaption>` : '';
    const sizes = options.sizes || '(max-width: 767px) calc(100vw - 4rem), (max-width: 1200px) 50vw, 520px';

    if (item.type === 'video') {
        const posterUrl = item.poster ? getPosterImageUrl(item) : '';
        return `
            <figure class="collection-slide is-video${slideFrame}">
                <div class="collection-media${frame}">
                    <video controls preload="metadata" playsinline ${posterUrl ? `poster="${escapeHTML(posterUrl)}"` : ''}>
                        <source src="${escapeHTML(item.src)}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                ${caption}
            </figure>
        `;
    }

    const zoomLabel = escapeHTML(item.caption || item.alt || projectTitle);
    const imageAlt = escapeHTML(item.alt || projectTitle);
    const zoomSrc = getZoomImageUrl(item);
    const responsiveImage = renderResponsivePicture(item, {
        sizes,
        widths: DETAIL_IMAGE_WIDTHS,
        loading: 'lazy',
        decoding: 'async'
    });

    return `
        <figure class="collection-slide${slideFrame}">
            <div class="collection-media${frame}">
                <button
                    class="media-zoom-trigger"
                    type="button"
                    data-zoom-src="${escapeHTML(zoomSrc)}"
                    data-zoom-alt="${imageAlt}"
                    data-zoom-caption="${escapeHTML(item.caption || '')}"
                    aria-label="Open full image: ${zoomLabel}"
                >
                    ${responsiveImage}
                    <span class="media-zoom-badge" aria-hidden="true">
                        <i data-feather="maximize-2"></i>
                    </span>
                </button>
            </div>
            ${caption}
        </figure>
    `;
}

function renderProjectOverview(project) {
    if (!Array.isArray(project.media) || !project.media.length) {
        return '';
    }

    const leadItem = project.media[0];
    const showcaseClasses = ['project-showcase'];
    if (leadItem.frame) {
        showcaseClasses.push(`project-showcase--${leadItem.frame}`);
    }
    if (Array.isArray(project.collections) && project.collections.length) {
        showcaseClasses.push('project-showcase--grouped');
    }
    const leadHint = leadItem.type === 'image'
        ? `
            <p class="project-showcase-note">
                <i data-feather="maximize-2"></i>
                <span>Tap or click the image to expand it.</span>
            </p>
        `
        : '';

    return `
        <section class="${showcaseClasses.join(' ')}">
            <div class="project-showcase-media">
                ${renderProjectMediaItem(leadItem, project.title, {
                    sizes: '(max-width: 767px) calc(100vw - 4rem), (max-width: 1200px) 70vw, 820px'
                })}
            </div>
            ${leadHint}
        </section>
    `;
}

function renderProjectLinks(project) {
    const links = [];

    if (project.liveUrl) {
        links.push({ href: project.liveUrl, label: 'Live Demo', icon: 'external-link', tone: 'primary' });
    }

    if (project.githubUrl) {
        links.push({ href: project.githubUrl, label: 'View Code', icon: 'github', tone: 'secondary' });
    }

    if (Array.isArray(project.links)) {
        links.push(...project.links);
    }

    if (!links.length) {
        return '';
    }

    return `
        <div class="project-links">
            ${links.map(link => `
                <a
                    href="${escapeHTML(link.href)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-${escapeHTML(link.tone || 'secondary')}"
                >
                    <i data-feather="${escapeHTML(link.icon || 'external-link')}"></i>
                    ${escapeHTML(link.label || 'Open Link')}
                </a>
            `).join('')}
        </div>
    `;
}

function formatCollectionCount(value) {
    return String(value).padStart(2, '0');
}

function getCollectionSummary(collection) {
    const media = Array.isArray(collection.media) ? collection.media : [];
    const total = media.length;
    const videoCount = media.filter(item => item.type === 'video').length;
    const imageCount = total - videoCount;
    const portraitCount = media.filter(item => item.frame === 'portrait').length;
    const landscapeCount = media.filter(item => item.frame === 'landscape').length;
    const collectionText = `${collection.title || ''} ${collection.description || ''}`.toLowerCase();
    const looksLikeScreenSet = /screen|mobile|landing|roll-?out|email|social|campaign/.test(collectionText);
    const looksLikeBooklet = /book|booklet|page|spread|editorial|menu|trend|publication/.test(collectionText);

    let label = 'Curated set';
    let hint = 'Use the arrows or swipe through the sequence.';

    if (videoCount && imageCount) {
        label = 'Mixed media rollout';
        hint = 'Swipe through the collection and play the video pieces inline.';
    } else if (videoCount) {
        label = videoCount > 1 ? 'Motion sequence' : 'Motion preview';
        hint = 'Move through the clips and play each study directly in the slider.';
    } else if (looksLikeScreenSet && total >= 3) {
        label = 'Screen sequence';
        hint = 'Browse the screens to compare layout, hierarchy, and channel adaptation.';
    } else if (looksLikeBooklet) {
        label = 'Booklet flow';
        hint = 'Move through the pages in reading order like a booklet.';
    } else if (total >= 5 && portraitCount >= Math.ceil(total * 0.6)) {
        label = 'Portrait sequence';
        hint = 'Move through the full set to see how the visuals develop across formats.';
    } else if (total >= 4 && (landscapeCount >= Math.ceil(total * 0.6) || /spread/.test(collectionText))) {
        label = 'Spread sequence';
        hint = 'Slide across the spreads to review the full layout rhythm.';
    } else if (total >= 5) {
        label = 'Screen collection';
        hint = 'Browse the full set to see how the system develops across formats.';
    }

    const breakdownParts = [];
    if (imageCount) {
        breakdownParts.push(`${imageCount} ${imageCount === 1 ? 'image' : 'images'}`);
    }
    if (videoCount) {
        breakdownParts.push(`${videoCount} ${videoCount === 1 ? 'video' : 'videos'}`);
    }

    return {
        total,
        label,
        hint,
        interactionHint: imageCount && !videoCount
            ? (total > 1 ? 'Swipe to browse and tap any image to enlarge.' : 'Tap the image to enlarge it.')
            : '',
        breakdown: breakdownParts.join(' + ')
    };
}

function renderProjectCollection(collection, projectTitle, index) {
    const slides = collection.media.map(item => renderProjectMediaItem(item, projectTitle)).join('');
    const summary = getCollectionSummary(collection);

    return `
        <section class="media-collection" data-collection>
            <div class="collection-header">
                <div class="collection-heading">
                    <span class="collection-index">Collection ${index + 1}</span>
                    <h4>${escapeHTML(collection.title)}</h4>
                    <div class="collection-meta">
                        <span class="collection-pill collection-pill--accent">${escapeHTML(summary.label)}</span>
                        <span class="collection-pill">${formatCollectionCount(summary.total)} items</span>
                        ${summary.breakdown ? `<span class="collection-pill">${escapeHTML(summary.breakdown)}</span>` : ''}
                    </div>
                </div>
                <div class="collection-copy">
                    <p>${escapeHTML(collection.description || '')}</p>
                    <div class="collection-assist">
                        <div class="collection-assist-copy">
                            <span class="collection-hint">${escapeHTML(summary.hint)}</span>
                            ${summary.interactionHint ? `<span class="collection-interaction-hint">${escapeHTML(summary.interactionHint)}</span>` : ''}
                        </div>
                        <span class="collection-progress" data-carousel-progress aria-live="polite">01 / ${formatCollectionCount(summary.total)}</span>
                    </div>
                </div>
            </div>
            <div class="collection-carousel" data-carousel>
                <button class="carousel-nav carousel-nav-prev" type="button" aria-label="Previous items">
                    <i data-feather="arrow-left"></i>
                </button>
                <div class="carousel-viewport">
                    <div class="carousel-track" data-carousel-track>
                        ${slides}
                    </div>
                </div>
                <button class="carousel-nav carousel-nav-next" type="button" aria-label="Next items">
                    <i data-feather="arrow-right"></i>
                </button>
            </div>
        </section>
    `;
}

function getCarouselStep(track) {
    const firstSlide = track.querySelector('.collection-slide');
    if (!firstSlide) {
        return track.clientWidth * 0.85;
    }

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || '0');
    return firstSlide.getBoundingClientRect().width + gap;
}

function getCarouselIndex(track) {
    const slides = Array.from(track.querySelectorAll('.collection-slide'));
    if (!slides.length) {
        return 0;
    }

    const trackLeft = track.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
}

function updateCarouselState(track, prevButton, nextButton, progressElement) {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth - 4);
    prevButton.disabled = track.scrollLeft <= 4;
    nextButton.disabled = track.scrollLeft >= maxScroll;

    if (progressElement) {
        const total = track.querySelectorAll('.collection-slide').length;
        const current = total ? getCarouselIndex(track) + 1 : 0;
        progressElement.textContent = `${formatCollectionCount(current)} / ${formatCollectionCount(total)}`;
    }
}

function initializeCollectionCarousels(container) {
    const carousels = container.querySelectorAll('[data-carousel]');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('[data-carousel-track]');
        const prevButton = carousel.querySelector('.carousel-nav-prev');
        const nextButton = carousel.querySelector('.carousel-nav-next');
        const progressElement = carousel.closest('[data-collection]')?.querySelector('[data-carousel-progress]');

        if (!track || !prevButton || !nextButton) {
            return;
        }

        const scrollByStep = direction => {
            track.scrollBy({
                left: getCarouselStep(track) * direction,
                behavior: 'smooth'
            });
        };

        prevButton.addEventListener('click', () => scrollByStep(-1));
        nextButton.addEventListener('click', () => scrollByStep(1));

        const syncState = () => updateCarouselState(track, prevButton, nextButton, progressElement);

        track.addEventListener('scroll', syncState, { passive: true });
        window.addEventListener('resize', syncState);
        syncState();
    });
}

function pauseProjectDetailsMedia(modal) {
    if (!modal) return;
    modal.querySelectorAll('video').forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

function resetProjectDetailsScroll(modal, bodyElement) {
    if (!modal || !bodyElement) return;

    bodyElement.scrollTop = 0;
    bodyElement.scrollLeft = 0;
    modal.scrollTop = 0;
    modal.querySelector('.modal-content')?.scrollTo(0, 0);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather icons
    replaceFeatherIcons();
    
    // ===== Theme Toggle =====
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'poster' theme
    const currentTheme = localStorage.getItem('theme') || 'poster';
    html.setAttribute('data-theme', currentTheme);
    
    // Update theme icon
    function updateThemeIcon() {
        if (!themeToggle) return;
        const theme = html.getAttribute('data-theme');
        themeToggle.innerHTML = `<i data-feather="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        replaceFeatherIcons();
    }
    
    updateThemeIcon();
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'poster' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
            
            // Track theme change
            if (window.VercelAnalytics) {
                window.VercelAnalytics.trackThemeChange(newTheme);
            }
        });
    }
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== Project Filtering =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('visible'), 10);
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.add('visible'), 10);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                }
            });
        });
    });
    
    // ===== Skill Bars Animation =====
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const skillObserver = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you would typically send this to your backend
            console.log('Newsletter signup:', email);
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }
    
    // ===== Modal Functionality =====
    const modals = document.querySelectorAll('.modal');
    const projectModal = document.getElementById('projectModal');
    const projectModalBody = projectModal?.querySelector('.modal-body');
    const projectDetailsModal = document.getElementById('projectDetailsModal');
    const projectDetailsBody = document.getElementById('projectDetailsBody');
    const liveDemoModal = document.getElementById('liveDemoModal');
    const liveDemoFrame = document.getElementById('liveDemoFrame');
    const liveDemoTitle = document.getElementById('liveDemoTitle');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const openExternalBtn = document.getElementById('openExternal');
    const imageZoomModal = document.getElementById('imageZoomModal');
    const imageZoomTitle = document.getElementById('imageZoomTitle');
    const imageZoomStage = document.getElementById('imageZoomStage');
    const imageZoomToggle = document.getElementById('imageZoomToggle');
    const imageZoomTarget = document.getElementById('imageZoomTarget');
    const imageZoomCaption = document.getElementById('imageZoomCaption');
    const imageZoomHint = document.getElementById('imageZoomHint');
    
    let currentDemoUrl = '';
    let currentZoomMeta = {
        naturalWidth: 0,
        naturalHeight: 0
    };

    function openCurrentDemoInNewTab() {
        if (!currentDemoUrl) {
            return;
        }

        window.open(currentDemoUrl, '_blank', 'noopener,noreferrer');
    }

    function syncBodyScrollLock() {
        const hasOpenModal = document.querySelector('.modal.open, .modal.active');
        document.body.style.overflow = hasOpenModal ? 'hidden' : '';
    }
    
    // Figma button handlers
    const figmaViewButtons = document.querySelectorAll('.figma-view');
    const figmaEmbedButtons = document.querySelectorAll('.figma-embed');
    
    figmaViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const safeFigmaUrl = toSafeHttpUrl(button.getAttribute('data-figma-url'));
            if (safeFigmaUrl) {
                window.open(safeFigmaUrl, '_blank', 'noopener,noreferrer');
                
                // Track Figma view
                if (window.VercelAnalytics) {
                    window.VercelAnalytics.trackEvent('figma_view', {
                        url: safeFigmaUrl
                    });
                }
            }
        });
    });
    
    figmaEmbedButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const safeEmbedUrl = toSafeHttpUrl(button.getAttribute('data-figma-embed'));
            const title = button.getAttribute('data-title') || 'Figma Design';
            
            if (safeEmbedUrl && liveDemoModal && liveDemoFrame) {
                currentDemoUrl = safeEmbedUrl;
                liveDemoTitle.textContent = title;
                liveDemoModal.classList.add('open');
                syncBodyScrollLock();
                
                if (loadingSpinner) loadingSpinner.style.display = 'flex';
                
                liveDemoFrame.src = safeEmbedUrl;
                
                liveDemoFrame.onload = () => {
                    if (loadingSpinner) loadingSpinner.style.display = 'none';
                };
                
                liveDemoFrame.onerror = () => {
                    handleIframeError();
                };
                
                // Track Figma embed view
                if (window.VercelAnalytics) {
                    window.VercelAnalytics.trackEvent('figma_embed_view', {
                        title: title,
                        url: safeEmbedUrl
                    });
                }
            }
        });
    });
    
    // Open live demo modal
    function openLiveDemo(url, title) {
        const safeUrl = toSafeHttpUrl(url);
        if (!safeUrl) {
            console.warn('Blocked unsafe demo URL:', url);
            return;
        }

        currentDemoUrl = safeUrl;
        
        if (liveDemoTitle) liveDemoTitle.textContent = title;
        if (liveDemoModal) liveDemoModal.classList.add('open');
        syncBodyScrollLock();
        
        // Show loading spinner
        if (loadingSpinner) loadingSpinner.style.display = 'flex';
        
        // Clear any previous error messages
        const existingErrors = document.querySelectorAll('.iframe-error');
        existingErrors.forEach(error => error.remove());
        
        // Try to load in iframe first
        if (liveDemoFrame) {
            // Reset iframe display
            liveDemoFrame.style.display = 'block';
            liveDemoFrame.src = safeUrl;
            
            // Set up iframe load handlers
            liveDemoFrame.onload = () => {
                if (loadingSpinner) loadingSpinner.style.display = 'none';
            };
            
            liveDemoFrame.onerror = () => {
                handleIframeError();
            };
            
            // Check if iframe is blocked after a delay
            setTimeout(() => {
                try {
                    // Try to access iframe content
                    const iframeDoc = liveDemoFrame.contentDocument || liveDemoFrame.contentWindow.document;
                    if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                        handleIframeError();
                    }
                } catch (e) {
                    // Cross-origin error is expected and means iframe loaded
                    if (loadingSpinner) loadingSpinner.style.display = 'none';
                }
            }, 3000);
            
            // Show loading help after 5 seconds
            setTimeout(() => {
                if (loadingSpinner && loadingSpinner.style.display !== 'none') {
                    showLoadingHelp();
                }
            }, 5000);
        }
        
        // Track demo view
        if (window.VercelAnalytics) {
            window.VercelAnalytics.trackEvent('live_demo_view', {
                title: title,
                url: safeUrl
            });
        }
    }
    
    // Handle iframe loading errors
    function handleIframeError() {
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        if (liveDemoFrame) liveDemoFrame.style.display = 'none';
        
        const iframeContainer = document.querySelector('.iframe-container');
        if (!iframeContainer) return;
        
        // Check if error message already exists
        if (iframeContainer.querySelector('.iframe-error')) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'iframe-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i data-feather="alert-circle"></i>
                <h4>Unable to load demo in iframe</h4>
                <p>This site cannot be embedded due to security restrictions.</p>
                <button class="btn btn-primary js-open-demo-tab" type="button">
                    <i data-feather="external-link"></i>
                    Open in New Tab
                </button>
            </div>
        `;
        const openButton = errorDiv.querySelector('.js-open-demo-tab');
        openButton?.addEventListener('click', openCurrentDemoInNewTab);
        iframeContainer.appendChild(errorDiv);
        
        // Re-initialize feather icons
        replaceFeatherIcons();
    }
    
    // Show loading help message
    function showLoadingHelp() {
        const iframeContainer = document.querySelector('.iframe-container');
        if (!iframeContainer || iframeContainer.querySelector('.loading-help')) return;
        
        const helpDiv = document.createElement('div');
        helpDiv.className = 'loading-help';
        helpDiv.innerHTML = `
            <p>Taking longer than expected?</p>
            <button class="btn btn-outline js-open-demo-tab" type="button">
                <i data-feather="external-link"></i>
                Open in New Tab
            </button>
        `;
        const openButton = helpDiv.querySelector('.js-open-demo-tab');
        openButton?.addEventListener('click', openCurrentDemoInNewTab);
        iframeContainer.appendChild(helpDiv);
        
        // Re-initialize feather icons
        replaceFeatherIcons();
    }

    function centerImageZoomStage() {
        if (!imageZoomStage || !imageZoomToggle) return;

        imageZoomStage.scrollLeft = Math.max(0, (imageZoomToggle.offsetWidth - imageZoomStage.clientWidth) / 2);
        imageZoomStage.scrollTop = Math.max(0, (imageZoomToggle.offsetHeight - imageZoomStage.clientHeight) / 2);
    }

    function updateImageZoomLayout({ center = false } = {}) {
        if (!imageZoomStage || !imageZoomTarget || !imageZoomModal?.classList.contains('open')) {
            return;
        }

        const naturalWidth = imageZoomTarget.naturalWidth || currentZoomMeta.naturalWidth;
        const naturalHeight = imageZoomTarget.naturalHeight || currentZoomMeta.naturalHeight;

        if (!naturalWidth || !naturalHeight) {
            return;
        }

        currentZoomMeta = { naturalWidth, naturalHeight };

        const availableWidth = Math.max(imageZoomStage.clientWidth - 24, 1);
        const availableHeight = Math.max(imageZoomStage.clientHeight - 24, 1);
        const fitScale = Math.min(availableWidth / naturalWidth, availableHeight / naturalHeight, 1);
        const zoomMultiplier = imageZoomModal.classList.contains('is-zoomed')
            ? Math.max(2, 1 / Math.max(fitScale, 0.45))
            : 1;
        const displayScale = fitScale * zoomMultiplier;

        imageZoomTarget.style.width = `${Math.max(1, Math.round(naturalWidth * displayScale))}px`;
        imageZoomTarget.style.height = `${Math.max(1, Math.round(naturalHeight * displayScale))}px`;

        if (center) {
            requestAnimationFrame(centerImageZoomStage);
        }
    }

    function setImageZoomState(isZoomed, options = {}) {
        if (!imageZoomModal || !imageZoomToggle || !imageZoomHint) return;

        imageZoomModal.classList.toggle('is-zoomed', isZoomed);
        imageZoomToggle.setAttribute('aria-label', isZoomed ? 'Zoom out image' : 'Zoom in image');
        imageZoomHint.textContent = isZoomed
            ? 'Drag or scroll to inspect details. Tap the image again to fit it back.'
            : 'Tap the image to zoom closer.';
        updateImageZoomLayout(options);
    }

    function openImageZoomModal(src, alt, caption) {
        if (!imageZoomModal || !imageZoomTarget || !imageZoomCaption || !imageZoomTitle) {
            return;
        }

        currentZoomMeta = { naturalWidth: 0, naturalHeight: 0 };
        imageZoomTitle.textContent = caption || alt || 'Image Preview';
        imageZoomCaption.textContent = caption || alt || '';
        imageZoomCaption.hidden = !imageZoomCaption.textContent;
        imageZoomModal.classList.add('open');
        imageZoomTarget.alt = alt || caption || 'Expanded project image';
        imageZoomTarget.src = src;
        syncBodyScrollLock();

        imageZoomTarget.onload = () => {
            setImageZoomState(false, { center: true });
        };

        if (imageZoomTarget.complete) {
            setImageZoomState(false, { center: true });
        }

        if (window.VercelAnalytics) {
            window.VercelAnalytics.trackEvent('project_image_zoom', {
                src,
                caption: caption || alt || ''
            });
        }
    }

    function closeImageZoomModal() {
        if (!imageZoomModal || !imageZoomTarget || !imageZoomCaption || !imageZoomTitle) {
            return;
        }

        imageZoomModal.classList.remove('open', 'is-zoomed');
        imageZoomTarget.removeAttribute('src');
        imageZoomTarget.alt = '';
        imageZoomTarget.style.width = '';
        imageZoomTarget.style.height = '';
        imageZoomTarget.onload = null;
        imageZoomCaption.textContent = '';
        imageZoomCaption.hidden = true;
        imageZoomTitle.textContent = 'Image Preview';
        currentZoomMeta = { naturalWidth: 0, naturalHeight: 0 };
        syncBodyScrollLock();
    }
    
    // Close modal functionality
    function closeModal() {
        if (projectModal) {
            projectModal.classList.remove('active', 'open');
        }
        if (liveDemoModal) {
            liveDemoModal.classList.remove('active', 'open');
        }
        
        // Reset iframe
        if (liveDemoFrame) {
            liveDemoFrame.src = '';
            liveDemoFrame.style.display = 'block';
        }
        
        // Remove error containers and loading help
        const errorContainers = document.querySelectorAll('.iframe-error');
        errorContainers.forEach(container => container.remove());
        
        const loadingHelp = document.querySelectorAll('.loading-help');
        loadingHelp.forEach(help => help.remove());
        
        // Reset loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        // Clear current demo URL
        currentDemoUrl = '';

        if (projectModalBody) {
            projectModalBody.innerHTML = '';
        }

        syncBodyScrollLock();
    }
    
    // Close modal button handlers
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Check which modal this button belongs to
            const modal = button.closest('.modal');
            if (modal && modal.id === 'imageZoomModal') {
                closeImageZoomModal();
            } else if (modal && modal.id === 'projectDetailsModal') {
                closeProjectDetailsModal();
            } else if (modal && modal.classList.contains('video-modal')) {
                closeVideoModal();
            } else {
                closeModal();
            }
        });
    });
    
    // Close modal on backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (modal.id === 'imageZoomModal') {
                    closeImageZoomModal();
                } else if (modal.id === 'projectDetailsModal') {
                    closeProjectDetailsModal();
                } else if (modal.classList.contains('video-modal')) {
                    closeVideoModal();
                } else {
                    closeModal();
                }
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') {
            return;
        }

        if (imageZoomModal?.classList.contains('open')) {
            closeImageZoomModal();
        } else if (document.getElementById('videoModal')?.classList.contains('open')) {
            closeVideoModal();
        } else if (projectDetailsModal?.classList.contains('open')) {
            closeProjectDetailsModal();
        } else if (liveDemoModal?.classList.contains('open') || projectModal?.classList.contains('open')) {
            closeModal();
        }
    });
    
    // Open external button
    if (openExternalBtn) {
        openExternalBtn.addEventListener('click', openCurrentDemoInNewTab);
    }

    if (imageZoomToggle) {
        imageZoomToggle.addEventListener('click', () => {
            setImageZoomState(!imageZoomModal?.classList.contains('is-zoomed'), { center: true });
        });
    }

    window.addEventListener('resize', () => {
        updateImageZoomLayout();
    });
    
    // Live demo button handlers
    const liveDemoButtons = document.querySelectorAll('.live-demo');
    liveDemoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const url = button.getAttribute('data-url');
            const title = button.getAttribute('data-title') || 'Live Demo';
            
            if (url) {
                openLiveDemo(url, title);
            }
        });
    });
    
    // ===== Project Details Functionality =====
    
    // View details button handlers
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            if (projectId) {
                const fallbackTitle = button.closest('.project-card')?.querySelector('h3')?.textContent?.trim() || 'Project Details';
                await openProjectDetails(projectId, fallbackTitle);
            }
        });
    });

    if (projectDetailsBody) {
        projectDetailsBody.addEventListener('click', e => {
            const zoomTrigger = e.target.closest('.media-zoom-trigger');
            if (!zoomTrigger) {
                return;
            }

            openImageZoomModal(
                zoomTrigger.dataset.zoomSrc,
                zoomTrigger.dataset.zoomAlt || '',
                zoomTrigger.dataset.zoomCaption || ''
            );
        });
    }
    
    // Open project details modal
    async function openProjectDetails(projectId, fallbackTitle = 'Project Details') {
        const modal = document.getElementById('projectDetailsModal');
        const titleElement = document.getElementById('projectDetailsTitle');
        const bodyElement = document.getElementById('projectDetailsBody');
        
        if (!modal || !titleElement || !bodyElement) return;

        const requestId = ++projectDetailsRequestId;
        titleElement.textContent = fallbackTitle;
        bodyElement.innerHTML = renderProjectDetailsLoading(fallbackTitle);
        modal.classList.add('open');
        syncBodyScrollLock();
        requestAnimationFrame(() => resetProjectDetailsScroll(modal, bodyElement));

        try {
            const projects = await loadProjectDetails();
            const project = projects[projectId];

            if (requestId !== projectDetailsRequestId) {
                return;
            }

            if (!project) {
                titleElement.textContent = fallbackTitle;
                bodyElement.innerHTML = renderProjectDetailsError('Project details for this item are not available yet.');
                return;
            }

            titleElement.textContent = project.title;
            const overviewMarkup = renderProjectOverview(project);
            const collectionsMarkup = Array.isArray(project.collections) && project.collections.length
                ? `
                    <div class="project-collections">
                        ${project.collections.map((collection, index) => renderProjectCollection(collection, project.title, index)).join('')}
                    </div>
                `
                : '';

            bodyElement.innerHTML = `
                <div class="project-details-content">
                    ${overviewMarkup}
                    <div class="project-description">
                        ${project.fullDescriptionHtml || ''}
                    </div>

                    ${collectionsMarkup}
                    
                    <div class="project-meta">
                        <h4>Tools and Focus</h4>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tag">${escapeHTML(tech)}</span>`).join('')}
                        </div>
                    </div>

                    ${renderProjectLinks(project)}
                </div>
            `;

            initializeCollectionCarousels(bodyElement);
            resetProjectDetailsScroll(modal, bodyElement);
            requestAnimationFrame(() => resetProjectDetailsScroll(modal, bodyElement));
            replaceFeatherIcons();

            if (window.VercelAnalytics) {
                window.VercelAnalytics.trackEvent('project_details_view', {
                    project: projectId,
                    title: project.title
                });
            }
        } catch (error) {
            if (requestId !== projectDetailsRequestId) {
                return;
            }

            console.error(error);
            titleElement.textContent = fallbackTitle;
            bodyElement.innerHTML = renderProjectDetailsError('Project details could not be loaded right now. Please try again.');
        }
    }
    
    // Close project details modal
    function closeProjectDetailsModal() {
        const modal = document.getElementById('projectDetailsModal');
        if (modal) {
            projectDetailsRequestId += 1;
            closeImageZoomModal();
            pauseProjectDetailsMedia(modal);
            modal.classList.remove('open');
            syncBodyScrollLock();
        }
    }
    
    // Make closeProjectDetailsModal globally accessible
    window.closeProjectDetailsModal = closeProjectDetailsModal;
    
    // ===== Video Project Functionality =====
    
    // Video play button handlers
    const videoPlayButtons = document.querySelectorAll('.video-play');
    videoPlayButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const videoUrl = button.getAttribute('data-video');
            const title = button.getAttribute('data-title') || 'Video';
            if (videoUrl) {
                openVideoModal(videoUrl, title);
            } else {
                console.error('No video URL found on button');
            }
        });
    });
    
    // Open video in modal
    function openVideoModal(videoUrl, title) {
        const videoModal = document.getElementById('videoModal');
        const videoModalTitle = document.getElementById('videoModalTitle');
        const modalVideo = document.getElementById('modalVideo');
        const safeVideoUrl = toSafeHttpUrl(videoUrl);

        if (!videoModal || !modalVideo) {
            console.error('Video modal elements not found');
            alert('Video modal niet gevonden. Probeer de pagina te verversen.');
            return;
        }

        if (!safeVideoUrl) {
            console.error('Blocked unsafe video URL:', videoUrl);
            alert('Video kon niet veilig geladen worden.');
            return;
        }
        
        // Set title
        if (videoModalTitle) {
            videoModalTitle.textContent = title;
        }
        
        // Set video source
        modalVideo.src = safeVideoUrl;
        modalVideo.load();
        
        // Show modal
        videoModal.classList.add('open');
        syncBodyScrollLock();

        // Play video
        modalVideo.play().catch(err => {
            console.error('Video autoplay prevented:', err);
            // Show play button or message to user
        });
        
        // Track video view
        if (window.VercelAnalytics) {
            window.VercelAnalytics.trackEvent('video_view', {
                title: title,
                url: safeVideoUrl
            });
        }
    }
    
    // Close video modal
    function closeVideoModal() {
        const videoModal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        
        if (videoModal) {
            videoModal.classList.remove('open');
        }
        
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.removeAttribute('src');
            modalVideo.load();
        }
        
        syncBodyScrollLock();
    }
    
    // Make closeVideoModal globally accessible
    window.closeVideoModal = closeVideoModal;
    
    // ===== Social Links Tracking =====
    const socialLinks = document.querySelectorAll('a[href*="github.com"], a[href*="instagram.com"], a[href*="linkedin.com"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const platform = detectSocialPlatform(link.getAttribute('href'));
            
            if (platform && window.VercelAnalytics) {
                window.VercelAnalytics.trackSocialClick(platform);
            }
        });
    });
    
    // ===== Project Button Tracking =====
    const projectButtons = document.querySelectorAll('.project-card .btn');
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectCard = button.closest('.project-card');
            const projectName = projectCard ? projectCard.querySelector('h3')?.textContent : 'Unknown';
            
            if (window.VercelAnalytics) {
                window.VercelAnalytics.trackProjectClick(projectName);
            }
        });
    });
    
    // ===== Scroll Header Styling =====
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });
});
