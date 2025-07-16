// Modern Portfolio Interactions 2024-2025
// Enhanced micro-interactions, scroll animations, and modern effects

class ModernPortfolio {
    constructor() {
        this.init();
        this.setupScrollAnimations();
        this.setupMicroInteractions();
        this.setupAdvancedEffects();
        this.setupResponsiveNav();
    }

    init() {
        // Initialize Feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Initialize theme toggle
        this.initThemeToggle();
        
        // Initialize smooth scrolling
        this.initSmoothScrolling();
        
        // Initialize performance optimizations
        this.initPerformanceOptimizations();
        
        // Initialize lazy loading
        this.initLazyLoading();
    }

    // ===== Theme Toggle with Enhanced Animations =====
    initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const body = document.body;
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                // Add transition effect
                body.style.transition = 'all 0.3s ease';
                
                // Toggle theme
                const isLight = body.classList.contains('light-theme');
                body.classList.toggle('light-theme', !isLight);
                body.classList.toggle('dark-theme', isLight);
                
                // Update icon with animation
                this.updateThemeIcon(isLight);
                
                // Remove transition after animation
                setTimeout(() => {
                    body.style.transition = '';
                }, 300);
            });
        }
    }

    updateThemeIcon(isLight) {
        const lightIcon = document.querySelector('.light-icon');
        const darkIcon = document.querySelector('.dark-icon');
        
        if (lightIcon && darkIcon) {
            if (isLight) {
                lightIcon.style.transform = 'rotate(180deg) scale(0)';
                darkIcon.style.transform = 'rotate(0deg) scale(1)';
            } else {
                lightIcon.style.transform = 'rotate(0deg) scale(1)';
                darkIcon.style.transform = 'rotate(180deg) scale(0)';
            }
        }
    }

    // ===== Smooth Scrolling with Enhanced Easing =====
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== Advanced Scroll Animations =====
    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.stagger-animation');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            scrollObserver.observe(el);
        });

        // Parallax effect for background elements
        this.setupParallaxEffect();
        
        // Header scroll effect
        this.setupHeaderScrollEffect();
    }

    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        if (parallaxElements.length > 0) {
            let ticking = false;
            
            const updateParallax = () => {
                const scrollY = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(scrollY * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            };

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            });
        }
    }

    setupHeaderScrollEffect() {
        const header = document.querySelector('.modern-header');
        let lastScrollY = window.scrollY;
        
        if (header) {
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                // Add scrolled class for styling
                header.classList.toggle('scrolled', currentScrollY > 50);
                
                // Hide/show header based on scroll direction
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollY = currentScrollY;
            });
        }
    }

    // ===== Micro-Interactions =====
    setupMicroInteractions() {
        // Enhanced button interactions
        this.setupButtonInteractions();
        
        // Card hover effects
        this.setupCardInteractions();
        
        // Form interactions
        this.setupFormInteractions();
        
        // Cursor follower effect
        this.setupCursorFollower();
    }

    setupButtonInteractions() {
        document.querySelectorAll('.btn-modern, .btn-glow, .btn-neuro').forEach(button => {
            // Ripple effect
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    setupCardInteractions() {
        document.querySelectorAll('.glass-card, .interactive-card').forEach(card => {
            // Mouse move effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * 5;
                const rotateY = (centerX - x) / centerX * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    setupFormInteractions() {
        document.querySelectorAll('input, textarea').forEach(input => {
            const label = input.nextElementSibling;
            
            // Floating label effect
            input.addEventListener('focus', () => {
                if (label && label.classList.contains('form-label')) {
                    label.style.transform = 'translateY(-150%) scale(0.8)';
                    label.style.color = 'var(--primary-glow)';
                }
            });
            
            input.addEventListener('blur', () => {
                if (label && label.classList.contains('form-label') && !input.value) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = 'var(--text-secondary)';
                }
            });
        });
    }

    setupCursorFollower() {
        // Only add cursor follower on desktop
        if (window.innerWidth > 768) {
            const cursor = document.createElement('div');
            cursor.className = 'cursor-follower';
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: radial-gradient(circle, var(--primary-glow), transparent);
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
                mix-blend-mode: difference;
            `;
            document.body.appendChild(cursor);
            
            // Track mouse movement
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX - 10 + 'px';
                cursor.style.top = e.clientY - 10 + 'px';
                cursor.style.opacity = '0.5';
            });
            
            // Hide cursor when leaving viewport
            document.addEventListener('mouseleave', () => {
                cursor.style.opacity = '0';
            });
        }
    }

    // ===== Advanced Effects =====
    setupAdvancedEffects() {
        // Typing animation
        this.setupTypingAnimation();
        
        // Particle background
        this.setupParticleBackground();
        
        // Loading animations
        this.setupLoadingAnimations();
    }

    setupTypingAnimation() {
        const typingElements = document.querySelectorAll('.typing-animation');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = element.dataset.speed || 50;
            
            element.textContent = '';
            
            const typeWriter = (i = 0) => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    setTimeout(() => typeWriter(i + 1), speed);
                } else {
                    // Add blinking cursor
                    const cursor = document.createElement('span');
                    cursor.className = 'typing-cursor';
                    cursor.textContent = '|';
                    cursor.style.cssText = `
                        color: var(--primary-glow);
                        font-weight: bold;
                        animation: blink 1s infinite;
                    `;
                    element.appendChild(cursor);
                }
            };
            
            // Start typing when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    setupParticleBackground() {
        // Only add particles on desktop for performance
        if (window.innerWidth > 768) {
            const canvas = document.createElement('canvas');
            canvas.id = 'particle-canvas';
            canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                opacity: 0.3;
            `;
            document.body.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            const particles = [];
            
            // Resize canvas
            const resizeCanvas = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };
            
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            
            // Create particles
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.vx = (Math.random() - 0.5) * 0.5;
                    this.vy = (Math.random() - 0.5) * 0.5;
                    this.radius = Math.random() * 2 + 1;
                    this.opacity = Math.random() * 0.5 + 0.2;
                }
                
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    
                    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                }
                
                draw() {
                    ctx.save();
                    ctx.globalAlpha = this.opacity;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = '#00f5ff';
                    ctx.fill();
                    ctx.restore();
                }
            }
            
            // Initialize particles
            for (let i = 0; i < 30; i++) {
                particles.push(new Particle());
            }
            
            // Animation loop
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                
                requestAnimationFrame(animate);
            };
            
            animate();
        }
    }

    setupLoadingAnimations() {
        // Skeleton loaders
        document.querySelectorAll('.skeleton-loader').forEach(skeleton => {
            skeleton.style.cssText = `
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
                background-size: 400% 100%;
                animation: shimmer 1.5s ease-in-out infinite;
            `;
        });
    }

    // ===== Responsive Navigation =====
    setupResponsiveNav() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                
                // Animate hamburger to X
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.style.transform = navMenu.classList.contains('active') 
                        ? 'rotate(90deg)' 
                        : 'rotate(0deg)';
                }
            });
        }
    }

    // ===== Performance Optimizations =====
    initPerformanceOptimizations() {
        // Debounced scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                document.body.classList.add('scroll-ended');
                setTimeout(() => {
                    document.body.classList.remove('scroll-ended');
                }, 100);
            }, 150);
        });
    }

    // ===== Lazy Loading =====
    initLazyLoading() {
        // Intersection Observer for lazy loading
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        lazyObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            lazyObserver.observe(img);
        });
    }
}

// CSS Animations for JavaScript effects
const additionalStyles = `
    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-glass);
        backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        padding: var(--space-lg);
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .stagger-animation {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .stagger-animation.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernPortfolio;
}
