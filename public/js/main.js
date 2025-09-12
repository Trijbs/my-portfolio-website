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
    
    // Track social media clicks
    const socialLinks = document.querySelectorAll('a[href*="github.com"], a[href*="instagram.com"], a[href*="mailto:"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.VercelAnalytics) {
                let platform = 'unknown';
                if (link.href.includes('github.com')) platform = 'GitHub';
                else if (link.href.includes('instagram.com')) platform = 'Instagram';
                else if (link.href.includes('mailto:')) platform = 'Email';
                
                window.VercelAnalytics.trackSocialClick(platform);
            }
        });
    });
    
    // Track project clicks
    const projectButtons = document.querySelectorAll('.live-demo, .project-card a[href*="github.com"]');
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.VercelAnalytics) {
                const projectCard = button.closest('.project-card');
                const projectName = projectCard ? projectCard.querySelector('h3')?.textContent || 'Unknown Project' : 'Unknown Project';
                window.VercelAnalytics.trackProjectClick(projectName);
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
    
    console.log('Portfolio initialized successfully');
});