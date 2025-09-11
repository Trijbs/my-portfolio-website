// Enhanced Portfolio JavaScript
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
    feather.replace();
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            body.classList.toggle('theme-poster');
            updateThemeIcon();
        });
    }
    
    function updateThemeIcon() {
        const isPoster = body.classList.contains('theme-poster');
        const lightIcon = document.querySelector('.light-icon');
        const darkIcon = document.querySelector('.dark-icon');
        
        if (lightIcon && darkIcon) {
            lightIcon.style.display = isPoster ? 'block' : 'none';
            darkIcon.style.display = isPoster ? 'none' : 'block';
        }
    }
    
    // Initialize theme icon
    updateThemeIcon();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Enhanced project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Animated skill bars
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-skill') || bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    // Enhanced contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-feather="loader"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Re-initialize feather icons
                feather.replace();
            }, 2000);
        });
    }
    
    // Scroll-triggered animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    document.querySelectorAll('.project-card, .testimonial-card, .highlight-item, .contact-method').forEach(el => {
        animateOnScroll.observe(el);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title .name-highlight');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Mobile menu functionality (enhanced)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            body.classList.toggle('nav-open');
            
            // Update aria attributes
            const isOpen = body.classList.contains('nav-open');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen);
            mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            
            // Prevent body scroll when menu is open
            body.style.overflow = isOpen ? 'hidden' : '';
        });
        
        // Close menu when clicking on nav links
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('nav-open');
                body.style.overflow = '';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'Open menu');
            });
        });
    }
    
    // Enhanced modal functionality
    const modal = document.getElementById('projectModal');
    const modalBody = modal?.querySelector('.modal-body');
    const closeBtn = modal?.querySelector('.close-modal');
    
    function openModal(content) {
        if (modal && modalBody) {
            modalBody.innerHTML = content;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            closeBtn?.focus();
        }
    }
    
    function closeModal() {
        if (modal && modalBody) {
            modal.classList.remove('open');
            modalBody.innerHTML = '';
            document.body.style.overflow = '';
        }
    }
    
    // Project detail buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            
            // Create detailed project content (you can customize this)
            const projectDetails = getProjectDetails(projectId);
            openModal(projectDetails);
        });
    });
    
    // Modal close events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('open')) {
            closeModal();
        }
        if (e.key === 'Escape' && liveDemoModal?.classList.contains('open')) {
            closeLiveDemoModal();
        }
    });
    
    // Test function for debugging (can be called from browser console)
    window.testLiveDemoModal = function() {
        console.log('Testing live demo modal...');
        openLiveDemoModal('https://example.com', 'Test Demo');
    };
    
    // Live Demo Modal functionality
    const liveDemoModal = document.getElementById('liveDemoModal');
    const liveDemoFrame = document.getElementById('liveDemoFrame');
    const liveDemoTitle = document.getElementById('liveDemoTitle');
    const openExternalBtn = document.getElementById('openExternal');
    const liveDemoCloseBtn = liveDemoModal?.querySelector('.close-modal');
    const loadingSpinner = liveDemoModal?.querySelector('.loading-spinner');
    
    console.log('Live demo modal elements:');
    console.log('liveDemoModal:', liveDemoModal);
    console.log('liveDemoFrame:', liveDemoFrame);
    console.log('liveDemoTitle:', liveDemoTitle);
    console.log('openExternalBtn:', openExternalBtn);
    console.log('liveDemoCloseBtn:', liveDemoCloseBtn);
    console.log('loadingSpinner:', loadingSpinner);
    
    let currentDemoUrl = '';
    
    function openLiveDemoModal(url, title) {
        try {
            console.log('openLiveDemoModal called with:', url, title);
            
            // Re-query elements in case they weren't available initially
            const modal = document.getElementById('liveDemoModal');
            const frame = document.getElementById('liveDemoFrame');
            const titleEl = document.getElementById('liveDemoTitle');
            const spinner = modal?.querySelector('.loading-spinner');
            
            console.log('Re-queried elements:');
            console.log('modal:', modal);
            console.log('frame:', frame);
            console.log('titleEl:', titleEl);
            console.log('spinner:', spinner);
            
            if (modal && frame && titleEl) {
                currentDemoUrl = url;
                titleEl.textContent = title;
                
                // Show loading spinner
                if (spinner) {
                    spinner.style.display = 'flex';
                }
                
                // Set iframe source
                frame.src = url;
                
                // Show modal
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
                
                console.log('Modal classes after adding open:', modal.classList.toString());
                console.log('Modal computed style display:', window.getComputedStyle(modal).display);
                console.log('Modal computed style opacity:', window.getComputedStyle(modal).opacity);
                console.log('Modal computed style visibility:', window.getComputedStyle(modal).visibility);
                console.log('Modal should be open now');
                
                // Focus management
                const closeBtn = modal.querySelector('.close-modal');
                closeBtn?.focus();
            } else {
                console.log('Missing required elements for modal');
                console.log('Available elements:', {modal, frame, titleEl});
            }
        } catch (error) {
            console.error('Error in openLiveDemoModal:', error);
        }
    }
    
    function closeLiveDemoModal() {
        if (liveDemoModal && liveDemoFrame) {
            liveDemoModal.classList.remove('open');
            liveDemoFrame.src = '';
            currentDemoUrl = '';
            document.body.style.overflow = '';
            
            // Hide loading spinner
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }
        }
    }
    
    // Live demo buttons
    try {
        console.log('Setting up live demo buttons...');
        const liveDemoButtons = document.querySelectorAll('.live-demo');
        console.log('Found', liveDemoButtons.length, 'live demo buttons');
        
        liveDemoButtons.forEach((btn, index) => {
            console.log(`Button ${index}:`, btn);
            btn.addEventListener('click', (e) => {
                try {
                    e.preventDefault();
                    console.log(`Live demo button ${index} clicked`);
                    const url = btn.getAttribute('data-url');
                    const title = btn.getAttribute('data-title');
                    console.log('URL:', url, 'Title:', title);
                    
                    if (url && title) {
                        console.log('Opening live demo modal');
                        openLiveDemoModal(url, title);
                    } else {
                        console.log('Missing URL or title');
                    }
                } catch (error) {
                    console.error('Error in live demo button click handler:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error setting up live demo buttons:', error);
    }
    
    // Open external button
    if (openExternalBtn) {
        openExternalBtn.addEventListener('click', () => {
            if (currentDemoUrl) {
                window.open(currentDemoUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }
    
    // Live demo modal close events
    if (liveDemoCloseBtn) {
        liveDemoCloseBtn.addEventListener('click', closeLiveDemoModal);
    }
    
    if (liveDemoModal) {
        liveDemoModal.addEventListener('click', (e) => {
            if (e.target === liveDemoModal) closeLiveDemoModal();
        });
    }
    
    // Hide loading spinner when iframe loads
    if (liveDemoFrame) {
        liveDemoFrame.addEventListener('load', () => {
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }
        });
        
        // Handle iframe loading errors
        liveDemoFrame.addEventListener('error', () => {
            if (loadingSpinner) {
                loadingSpinner.innerHTML = `
                    <div class="error-icon" style="font-size: 2rem; color: var(--accent-secondary);">⚠️</div>
                    <p>Failed to load demo</p>
                    <button class="btn btn-primary" onclick="window.open('${currentDemoUrl}', '_blank')">
                        Open in New Tab
                    </button>
                `;
            }
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i data-feather="${type === 'success' ? 'check-circle' : 'info'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i data-feather="x"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        feather.replace();
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // Copy email to clipboard
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.getAttribute('href').replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email address copied to clipboard!', 'success');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Email address copied to clipboard!', 'success');
            }
        });
    });
    
    // Make showNotification globally available
    window.showNotification = showNotification;
});

// Project details function
function getProjectDetails(projectId) {
    const projects = {
        'urban-unleashed': `
            <div class="project-detail">
                <h2>Urban Unleashed</h2>
                <p>An immersive 3D generative art experience that pushes the boundaries of web-based creative expression. The homescreen provides an intuitive gateway to explore dynamic 3D environments.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li>Interactive homescreen with smooth navigation</li>
                    <li>Real-time 3D rendering with Three.js</li>
                    <li>Procedural generation algorithms</li>
                    <li>Seamless loading transitions</li>
                    <li>Responsive design for all devices</li>
                </ul>
                <h3>Technologies Used:</h3>
                <div class="tech-stack">
                    <span class="tech-item">Next.js</span>
                    <span class="tech-item">Three.js</span>
                    <span class="tech-item">WebGL</span>
                    <span class="tech-item">GLSL Shaders</span>
                </div>
                <div class="project-links">
                    <a href="https://urban-unleashed.vercel.app" target="_blank" class="btn btn-primary">
                        <i data-feather="external-link"></i> View Live Site
                    </a>
                    <a href="https://github.com/trijbs" target="_blank" class="btn btn-secondary">
                        <i data-feather="github"></i> View Code
                    </a>
                </div>
            </div>
        `,
        'popfusion': `
            <div class="project-detail">
                <h2>PopFusion</h2>
                <p>A dynamic music visualizer that creates stunning visual representations of audio in real-time.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li>Real-time audio analysis</li>
                    <li>Multiple visualization modes</li>
                    <li>Customizable color schemes</li>
                    <li>Export functionality</li>
                </ul>
                <h3>Technologies Used:</h3>
                <div class="tech-stack">
                    <span class="tech-item">React</span>
                    <span class="tech-item">Web Audio API</span>
                    <span class="tech-item">Canvas API</span>
                    <span class="tech-item">CSS3</span>
                </div>
                <div class="project-links">
                    <a href="https://trijbs.eu/PopFusion2/" target="_blank" class="btn btn-primary">
                        <i data-feather="external-link"></i> View Live Site
                    </a>
                    <a href="https://github.com/trijbs" target="_blank" class="btn btn-secondary">
                        <i data-feather="github"></i> View Code
                    </a>
                </div>
            </div>
        `,
        'webshop': `
            <div class="project-detail">
                <h2>E-commerce Platform</h2>
                <p>A full-featured e-commerce solution with modern design and robust functionality.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li>Product catalog with search and filtering</li>
                    <li>Shopping cart and checkout process</li>
                    <li>User authentication and profiles</li>
                    <li>Admin dashboard for management</li>
                    <li>Payment integration</li>
                </ul>
                <h3>Technologies Used:</h3>
                <div class="tech-stack">
                    <span class="tech-item">React</span>
                    <span class="tech-item">Node.js</span>
                    <span class="tech-item">MongoDB</span>
                    <span class="tech-item">Stripe API</span>
                </div>
                <div class="project-links">
                    <a href="https://trijbs.eu/Webshop/" target="_blank" class="btn btn-primary">
                        <i data-feather="external-link"></i> View Live Site
                    </a>
                    <a href="https://github.com/trijbs" target="_blank" class="btn btn-secondary">
                        <i data-feather="github"></i> View Code
                    </a>
                </div>
            </div>
        `
    };
    
    return projects[projectId] || '<p>Project details not available.</p>';
}