// Main JavaScript functionality
// Combines functionality for improved user experience

// Escape HTML special characters in a string
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (m) {
        switch (m) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#39;';
            default: return m;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('theme-dark');
            body.classList.toggle('theme-poster');
            updateThemeIcon();
            
            // Track theme change
            if (window.VercelAnalytics) {
                const currentTheme = body.classList.contains('theme-dark') ? 'dark' : 'poster';
                window.VercelAnalytics.trackThemeChange(currentTheme);
            }
        });
    }
    
    function updateThemeIcon() {
        const lightIcon = themeToggle?.querySelector('.light-icon');
        const darkIcon = themeToggle?.querySelector('.dark-icon');
        
        if (body.classList.contains('theme-dark')) {
            if (lightIcon) lightIcon.style.display = 'block';
            if (darkIcon) darkIcon.style.display = 'none';
        } else {
            if (lightIcon) lightIcon.style.display = 'none';
            if (darkIcon) darkIcon.style.display = 'block';
        }
    }
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            body.classList.toggle('nav-open');
            const isOpen = body.classList.contains('nav-open');
            
            // Update aria attributes
            mobileMenuToggle.setAttribute('aria-expanded', isOpen);
            mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            
            // Toggle icons
            const menuIcon = mobileMenuToggle.querySelector('.icon-menu');
            const closeIcon = mobileMenuToggle.querySelector('.icon-close');
            
            if (menuIcon && closeIcon) {
                menuIcon.style.display = isOpen ? 'none' : 'block';
                closeIcon.style.display = isOpen ? 'block' : 'none';
            }
            
            // Prevent body scroll when menu is open
            body.style.overflow = isOpen ? 'hidden' : '';
        });
        
        // Close menu when clicking nav links
        const navLinks = mainNav.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('nav-open');
                body.style.overflow = '';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'Open menu');
                
                const menuIcon = mobileMenuToggle.querySelector('.icon-menu');
                const closeIcon = mobileMenuToggle.querySelector('.icon-close');
                
                if (menuIcon && closeIcon) {
                    menuIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                }
            });
        });
        
        // Close menu on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024 && body.classList.contains('nav-open')) {
                body.classList.remove('nav-open');
                body.style.overflow = '';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project filtering
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
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || (categories && categories.includes(filter))) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Skill bar animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                // Here you would typically send the email to your backend
                alert('Thank you for subscribing! (This is a demo)');
                newsletterForm.reset();
            }
        });
    }
    
    // Initialize theme icon on page load
    updateThemeIcon();
    
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const liveDemoModal = document.getElementById('liveDemoModal');
    const liveDemoFrame = document.getElementById('liveDemoFrame');
    const liveDemoTitle = document.getElementById('liveDemoTitle');
    const openExternalBtn = document.getElementById('openExternal');
    const loadingSpinner = document.querySelector('.loading-spinner');
    
    let currentDemoUrl = '';
    
    // Live demo button handlers
    const liveDemoButtons = document.querySelectorAll('.live-demo');
    console.log('Found live demo buttons:', liveDemoButtons.length);
    
    liveDemoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const url = button.getAttribute('data-url');
            const title = button.getAttribute('data-title') || 'Live Demo';
            
            console.log('Opening live demo:', { url, title });
            
            if (url) {
                openLiveDemo(url, title);
            }
        });
    });
    
    // Figma view button handlers
    const figmaViewButtons = document.querySelectorAll('.figma-view');
    console.log('Found Figma view buttons:', figmaViewButtons.length);
    
    figmaViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const figmaUrl = button.getAttribute('data-figma-url');
            
            if (figmaUrl && figmaUrl !== 'YOUR_FIGMA_URL_HERE') {
                // Open Figma in new tab
                window.open(figmaUrl, '_blank', 'noopener,noreferrer');
                
                // Track Figma view
                if (window.VercelAnalytics) {
                    window.VercelAnalytics.trackEvent('figma_view', {
                        title: button.getAttribute('data-title'),
                        url: figmaUrl
                    });
                }
            } else {
                alert('Figma URL not configured yet. Please add your Figma file URL.');
            }
        });
    });
    
    // Figma embed button handlers
    const figmaEmbedButtons = document.querySelectorAll('.figma-embed');
    console.log('Found Figma embed buttons:', figmaEmbedButtons.length);
    
    figmaEmbedButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const embedUrl = button.getAttribute('data-figma-embed');
            const title = button.getAttribute('data-title') || 'Figma Design';
            
            if (embedUrl && embedUrl !== 'YOUR_FIGMA_EMBED_URL') {
                openFigmaEmbed(embedUrl, title);
            } else {
                alert('Figma embed URL not configured yet. Please add your Figma embed URL.');
            }
        });
    });
    
    // Open Figma embed in modal
    function openFigmaEmbed(embedUrl, title) {
        currentDemoUrl = embedUrl;
        
        if (liveDemoTitle) liveDemoTitle.textContent = title;
        if (liveDemoModal) liveDemoModal.classList.add('open');
        
        // Show loading spinner
        if (loadingSpinner) loadingSpinner.style.display = 'flex';
        
        // Clear any previous error messages
        const existingErrors = document.querySelectorAll('.iframe-error');
        existingErrors.forEach(error => error.remove());
        
        // Load Figma embed
        if (liveDemoFrame) {
            liveDemoFrame.style.display = 'block';
            liveDemoFrame.src = embedUrl;
            
            liveDemoFrame.onload = () => {
                console.log('Figma embed loaded successfully');
                if (loadingSpinner) loadingSpinner.style.display = 'none';
            };
            
            liveDemoFrame.onerror = () => {
                console.log('Figma embed error');
                handleIframeError();
            };
            
            // Track Figma embed view
            if (window.VercelAnalytics) {
                window.VercelAnalytics.trackEvent('figma_embed_view', {
                    title: title,
                    url: embedUrl
                });
            }
        }
    }
    
    // Open live demo modal
    function openLiveDemo(url, title) {
        currentDemoUrl = url;
        
        if (liveDemoTitle) liveDemoTitle.textContent = title;
        if (liveDemoModal) liveDemoModal.classList.add('open');
        
        // Show loading spinner
        if (loadingSpinner) loadingSpinner.style.display = 'flex';
        
        // Clear any previous error messages
        const existingErrors = document.querySelectorAll('.iframe-error');
        existingErrors.forEach(error => error.remove());
        
        // Try to load in iframe first
        if (liveDemoFrame) {
            // Reset iframe display
            liveDemoFrame.style.display = 'block';
            liveDemoFrame.src = url;
            
            // Set up iframe load handlers
            liveDemoFrame.onload = () => {
                console.log('Iframe loaded successfully');
                if (loadingSpinner) loadingSpinner.style.display = 'none';
            };
            
            liveDemoFrame.onerror = () => {
                console.log('Iframe error event triggered');
                handleIframeError();
            };
            
            // Check if iframe is blocked after a delay
            setTimeout(() => {
                try {
                    // Try to access iframe content to detect if it's blocked
                    const iframeDoc = liveDemoFrame.contentDocument || liveDemoFrame.contentWindow.document;
                    if (!iframeDoc || iframeDoc.location.href === 'about:blank') {
                        console.log('Iframe appears to be blocked or empty');
                        handleIframeError();
                    }
                } catch (e) {
                    // Cross-origin restriction - this is normal, iframe is likely working
                    console.log('Cross-origin restriction (normal):', e.message);
                    if (loadingSpinner) loadingSpinner.style.display = 'none';
                }
            }, 3000);
            
            // Show loading help after 5 seconds
            setTimeout(() => {
                showLoadingHelp();
            }, 5000);
            
            // Final fallback timeout
            setTimeout(() => {
                if (loadingSpinner && loadingSpinner.style.display !== 'none') {
                    console.log('Iframe loading timeout - showing error');
                    handleIframeError();
                }
            }, 10000);
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Track demo view
        if (window.VercelAnalytics) {
            window.VercelAnalytics.trackDemoView(title);
        }
    }
    
    // Handle iframe loading errors (when site blocks embedding)
    function handleIframeError() {
        console.log('Handling iframe error for URL:', currentDemoUrl);
        
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        
        // Hide iframe and show error message
        if (liveDemoFrame) {
            liveDemoFrame.style.display = 'none';
            
            // Remove any existing error containers
            const existingErrors = document.querySelectorAll('.iframe-error');
            existingErrors.forEach(error => error.remove());
            
            // Create error message
            const errorContainer = document.createElement('div');
            errorContainer.className = 'iframe-error';
            errorContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 2rem; text-align: center; background: var(--bg-secondary); border-radius: 12px; min-height: 400px;">
                    <i data-feather="external-link" style="width: 48px; height: 48px; color: var(--accent-primary); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 1.25rem;">Unable to embed this demo</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem; max-width: 400px; line-height: 1.5;">This website prevents embedding for security reasons. Click the button below to open it in a new tab for the full experience.</p>
                    <button class="btn btn-primary" onclick="window.open('${escapeHTML(currentDemoUrl)}', '_blank', 'noopener,noreferrer'); closeModal();" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                        <i data-feather="external-link" style="width: 16px; height: 16px;"></i>
                        Open in New Tab
                    </button>
                </div>
            `;
            
            const modalBody = liveDemoModal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.appendChild(errorContainer);
                
                // Re-initialize feather icons for the new content
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            }
        }
    }
    
    // Show loading help after delay
    function showLoadingHelp() {
        if (loadingSpinner && loadingSpinner.style.display !== 'none') {
            // Check if help message already exists
            const existingHelp = loadingSpinner.querySelector('.loading-help');
            if (existingHelp) return;
            
            const helpMessage = document.createElement('div');
            helpMessage.className = 'loading-help';
            helpMessage.innerHTML = `
                <p style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;">Taking longer than expected?</p>
                <button class="btn btn-outline" onclick="handleIframeError();" style="margin-top: 0.5rem; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                    <i data-feather="external-link" style="width: 14px; height: 14px;"></i>
                    Open in New Tab Instead
                </button>
            `;
            
            if (loadingSpinner) {
                loadingSpinner.appendChild(helpMessage);
                
                // Re-initialize feather icons
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            }
        }
    }
    
    // Open external button handler
    if (openExternalBtn) {
        openExternalBtn.addEventListener('click', () => {
            if (currentDemoUrl) {
                window.open(currentDemoUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }
    
    // Close modal functionality
    function closeModal() {
        modals.forEach(modal => {
            modal.classList.remove('active', 'open');
        });
        
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
        
        // Reset body scroll
        document.body.style.overflow = '';
        
        // Clear current demo URL
        currentDemoUrl = '';
    }
    
    // Make closeModal globally accessible
    window.closeModal = closeModal;
    window.handleIframeError = handleIframeError;
    
    // Debug function for troubleshooting
    window.debugLiveDemo = function() {
        console.log('=== Live Demo Debug Info ===');
        console.log('Live demo buttons found:', liveDemoButtons.length);
        console.log('Live demo modal:', liveDemoModal);
        console.log('Live demo frame:', liveDemoFrame);
        console.log('Current demo URL:', currentDemoUrl);
        console.log('Modal classes:', liveDemoModal?.className);
        console.log('Frame src:', liveDemoFrame?.src);
        console.log('Loading spinner display:', loadingSpinner?.style.display);
    };
    
    // Close modal button handlers
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // Close modal on backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Secure URL validation function
    function getSocialPlatform(url) {
        try {
            // Handle mailto links separately
            if (url.startsWith('mailto:')) {
                return 'Email';
            }
            
            // Parse the URL to get the hostname
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();
            
            // Define allowed social media domains
            const allowedDomains = {
                'github.com': 'GitHub',
                'www.github.com': 'GitHub',
                'instagram.com': 'Instagram',
                'www.instagram.com': 'Instagram'
            };
            
            // Check if the hostname exactly matches an allowed domain
            if (allowedDomains[hostname]) {
                return allowedDomains[hostname];
            }
            
            // Check for subdomains of allowed domains
            for (const [domain, platform] of Object.entries(allowedDomains)) {
                if (hostname === domain || hostname.endsWith('.' + domain)) {
                    return platform;
                }
            }
            
            return 'unknown';
        } catch (error) {
            // Invalid URL
            return 'unknown';
        }
    }
    
    // Track social media clicks
    const socialLinks = document.querySelectorAll('a[href*="github.com"], a[href*="instagram.com"], a[href*="mailto:"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.VercelAnalytics) {
                const platform = getSocialPlatform(link.href);
                window.VercelAnalytics.trackSocialClick(platform);
            }
        });
    });
    
    // Secure GitHub URL validation function
    function isValidGitHubUrl(url) {
        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();
            
            // Check if it's a valid GitHub domain
            return hostname === 'github.com' || 
                   hostname === 'www.github.com' || 
                   hostname.endsWith('.github.com');
        } catch (error) {
            return false;
        }
    }
    
    // Track project clicks
    const projectButtons = document.querySelectorAll('.live-demo, .project-card a');
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.VercelAnalytics) {
                // Only track if it's a valid GitHub URL or a live demo button
                const isLiveDemo = button.classList.contains('live-demo');
                const isValidGitHub = button.href && isValidGitHubUrl(button.href);
                
                if (isLiveDemo || isValidGitHub) {
                    const projectCard = button.closest('.project-card');
                    const projectName = projectCard ? projectCard.querySelector('h3')?.textContent || 'Unknown Project' : 'Unknown Project';
                    window.VercelAnalytics.trackProjectClick(projectName);
                }
            }
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Add scroll-based header styling
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            if (scrollTop > 100) {
                header.style.background = 'rgba(246, 245, 243, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(246, 245, 243, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== Video Project Functionality =====
    
    // Video hover autoplay
    const videoProjects = document.querySelectorAll('.video-project');
    videoProjects.forEach(project => {
        const video = project.querySelector('.preview-video');
        
        if (video) {
            // Play video on hover
            project.addEventListener('mouseenter', () => {
                video.play().catch(err => console.log('Video autoplay prevented:', err));
            });
            
            // Pause video when not hovering
            project.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Reset to start
            });
        }
    });
    
    // Video play button handlers
    const videoPlayButtons = document.querySelectorAll('.video-play');
    console.log('Found video play buttons:', videoPlayButtons.length);
    
    videoPlayButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = button.getAttribute('data-video');
            const title = button.getAttribute('data-title') || 'Video';
            
            console.log('Opening video:', { videoUrl, title });
            
            if (videoUrl) {
                openVideoModal(videoUrl, title);
            }
        });
    });
    
    // Video download button handlers
    const videoDownloadButtons = document.querySelectorAll('.video-download');
    console.log('Found video download buttons:', videoDownloadButtons.length);
    
    videoDownloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = button.getAttribute('data-video');
            
            if (videoUrl) {
                // Create temporary link and trigger download
                const link = document.createElement('a');
                link.href = videoUrl;
                link.download = videoUrl.split('/').pop(); // Get filename from URL
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Track download
                if (window.VercelAnalytics) {
                    window.VercelAnalytics.trackEvent('video_download', {
                        video: videoUrl
                    });
                }
            }
        });
    });
    
    // Open video in modal
    function openVideoModal(videoUrl, title) {
        // Create video modal if it doesn't exist
        let videoModal = document.getElementById('videoModal');
        
        if (!videoModal) {
            videoModal = document.createElement('div');
            videoModal.id = 'videoModal';
            videoModal.className = 'modal video-modal';
            videoModal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="videoModalTitle">${escapeHTML(title)}</h3>
                        <div class="modal-actions">
                            <button class="close-modal" aria-label="Close modal">
                                <i data-feather="x"></i>
                            </button>
                        </div>
                    </div>
                    <div class="video-container">
                        <video id="modalVideo" controls autoplay>
                            <source src="${escapeHTML(videoUrl)}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="video-controls" style="display: none;">
                            <button class="video-play-pause" aria-label="Play/Pause">
                                <i data-feather="play"></i>
                            </button>
                            <div class="video-progress">
                                <div class="video-progress-bar"></div>
                            </div>
                            <span class="video-time">0:00 / 0:00</span>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(videoModal);
            
            // Re-initialize feather icons
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
            
            // Add close button handler
            const closeBtn = videoModal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeVideoModal);
            }
            
            // Close on backdrop click
            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) {
                    closeVideoModal();
                }
            });
        } else {
            // Update existing modal
            const videoModalTitle = document.getElementById('videoModalTitle');
            const modalVideo = document.getElementById('modalVideo');
            
            if (videoModalTitle) videoModalTitle.textContent = title;
            if (modalVideo) {
                modalVideo.src = videoUrl;
                modalVideo.load();
                modalVideo.play();
            }
        }
        
        // Show modal
        videoModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        // Track video view
        if (window.VercelAnalytics) {
            window.VercelAnalytics.trackEvent('video_view', {
                title: title,
                url: videoUrl
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
        }
        
        document.body.style.overflow = '';
    }
    
    // Make closeVideoModal globally accessible
    window.closeVideoModal = closeVideoModal;
    
    // Close video modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const videoModal = document.getElementById('videoModal');
            if (videoModal && videoModal.classList.contains('open')) {
                closeVideoModal();
            }
        }
    });
    
    console.log('Portfolio initialized successfully');
});