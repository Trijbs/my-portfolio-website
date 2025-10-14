// Main JavaScript functionality
// Combines functionality for improved user experience

// Project details data
const projectDetails = {
    'urban-unleashed': {
        title: 'Urban Unleashed',
        description: 'Een immersieve 3D generatieve kunst ervaring gebouwd met Next.js en Three.js.',
        fullDescription: `
            <p><strong>Urban Unleashed</strong> is een innovatief webproject dat de grenzen van web-gebaseerde 3D graphics verkent. Het project combineert moderne web technologieën met creatieve generatieve kunst.</p>
            
            <h4>🎯 Belangrijkste Features:</h4>
            <ul>
                <li><strong>Real-time 3D Rendering:</strong> Gebruik van Three.js voor vloeiende 3D graphics</li>
                <li><strong>Procedurele Generatie:</strong> Dynamische content die elke keer uniek is</li>
                <li><strong>Interactieve Controls:</strong> Intuïtieve interface voor gebruikersinteractie</li>
                <li><strong>Responsive Design:</strong> Werkt perfect op alle apparaten</li>
                <li><strong>Performance Optimized:</strong> Geoptimaliseerd voor snelle laadtijden</li>
            </ul>
            
            <h4>🛠️ Technologieën:</h4>
            <ul>
                <li><strong>Next.js:</strong> React framework voor server-side rendering</li>
                <li><strong>Three.js:</strong> JavaScript 3D library voor WebGL</li>
                <li><strong>WebGL:</strong> Hardware-accelerated graphics</li>
                <li><strong>React:</strong> Component-based UI development</li>
            </ul>
            
            <h4>🎨 Design Approach:</h4>
            <p>Het design focust op een clean, moderne interface die de 3D content laat schitteren. De homescreen is ontworpen met gebruiksvriendelijkheid in gedachten, met duidelijke navigatie en intuïtieve controls.</p>
            
            <h4>🚀 Performance:</h4>
            <p>Het project is geoptimaliseerd voor performance met lazy loading, code splitting, en efficient rendering. De 3D graphics zijn geoptimaliseerd om vloeiend te draaien op verschillende apparaten.</p>
        `,
        technologies: ['Next.js', 'Three.js', 'WebGL', 'React', 'Generative Art'],
        liveUrl: 'https://urban-unleashed.vercel.app',
        githubUrl: 'https://github.com/yourusername/urban-unleashed'
    },
    'popfusion': {
        title: 'PopFusion',
        description: 'Een moderne e-commerce platform voor popcultuur merchandise.',
        fullDescription: `
            <p><strong>PopFusion</strong> is een volledig functioneel e-commerce platform speciaal ontworpen voor popcultuur merchandise. Het project combineert moderne webshop functionaliteit met een aantrekkelijk design.</p>
            
            <h4>🎯 Belangrijkste Features:</h4>
            <ul>
                <li><strong>Product Catalogus:</strong> Uitgebreide productpagina's met filters en zoekfunctie</li>
                <li><strong>Winkelwagen:</strong> Volledig functionele shopping cart met real-time updates</li>
                <li><strong>Checkout Proces:</strong> Gestroomlijnd checkout proces met meerdere betaalopties</li>
                <li><strong>Responsive Design:</strong> Perfect geoptimaliseerd voor mobile shopping</li>
                <li><strong>Admin Dashboard:</strong> Beheer producten, orders en klanten</li>
            </ul>
            
            <h4>🛠️ Technologieën:</h4>
            <ul>
                <li><strong>React:</strong> Frontend framework voor dynamische UI</li>
                <li><strong>Node.js:</strong> Backend server voor API endpoints</li>
                <li><strong>MongoDB:</strong> Database voor product en order management</li>
                <li><strong>Stripe:</strong> Veilige betalingsverwerking</li>
                <li><strong>Express:</strong> Web application framework</li>
            </ul>
            
            <h4>🎨 Design Features:</h4>
            <p>Het design is geïnspireerd door moderne e-commerce platforms met een focus op gebruiksvriendelijkheid. Grote productafbeeldingen, duidelijke call-to-actions, en een intuïtieve navigatie zorgen voor een optimale shopping ervaring.</p>
            
            <h4>🔒 Security:</h4>
            <p>Het platform implementeert industry-standard security practices inclusief HTTPS, secure payment processing via Stripe, en data encryptie voor gebruikersinformatie.</p>
        `,
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express', 'E-commerce'],
        liveUrl: 'https://popfusion.vercel.app',
        githubUrl: 'https://github.com/yourusername/popfusion'
    },
    'webshop': {
        title: 'Modern Webshop',
        description: 'Een schaalbare e-commerce oplossing met moderne features.',
        fullDescription: `
            <p><strong>Modern Webshop</strong> is een schaalbare e-commerce oplossing gebouwd met de nieuwste web technologieën. Het project demonstreert best practices in webshop development.</p>
            
            <h4>🎯 Belangrijkste Features:</h4>
            <ul>
                <li><strong>Product Management:</strong> Uitgebreid product management systeem</li>
                <li><strong>Order Processing:</strong> Geautomatiseerd order processing en tracking</li>
                <li><strong>User Accounts:</strong> Klant accounts met order geschiedenis</li>
                <li><strong>Search & Filters:</strong> Geavanceerde zoek- en filterfunctionaliteit</li>
                <li><strong>Analytics Dashboard:</strong> Real-time sales en traffic analytics</li>
            </ul>
            
            <h4>🛠️ Technologieën:</h4>
            <ul>
                <li><strong>Next.js:</strong> Full-stack React framework</li>
                <li><strong>TypeScript:</strong> Type-safe development</li>
                <li><strong>Prisma:</strong> Modern database ORM</li>
                <li><strong>PostgreSQL:</strong> Relational database</li>
                <li><strong>Tailwind CSS:</strong> Utility-first CSS framework</li>
            </ul>
            
            <h4>🎨 User Experience:</h4>
            <p>De webshop is ontworpen met focus op conversie optimalisatie. Elke pagina is geoptimaliseerd om bezoekers te converteren naar klanten, met duidelijke product informatie, reviews, en een frictionless checkout proces.</p>
            
            <h4>📊 Performance & SEO:</h4>
            <p>Het project scoort hoog op alle web vitals metrics en is volledig geoptimaliseerd voor zoekmachines. Server-side rendering zorgt voor snelle laadtijden en betere SEO rankings.</p>
        `,
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'E-commerce'],
        liveUrl: 'https://webshop-demo.vercel.app',
        githubUrl: 'https://github.com/yourusername/webshop'
    }
};

// Escape HTML special characters in a string
function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing portfolio...');
    
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // ===== Theme Toggle =====
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'poster' theme
    const currentTheme = localStorage.getItem('theme') || 'poster';
    html.setAttribute('data-theme', currentTheme);
    
    // Update theme icon
    function updateThemeIcon() {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (!icon) return;
        
        const theme = html.getAttribute('data-theme');
        icon.setAttribute('data-feather', theme === 'dark' ? 'sun' : 'moon');
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
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
    
    // ===== Mobile Menu =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Update aria-expanded
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
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
    const liveDemoModal = document.getElementById('liveDemoModal');
    const liveDemoFrame = document.getElementById('liveDemoFrame');
    const liveDemoTitle = document.getElementById('liveDemoTitle');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const openExternalBtn = document.getElementById('openExternal');
    
    let currentDemoUrl = '';
    
    // Figma button handlers
    const figmaViewButtons = document.querySelectorAll('.figma-view');
    const figmaEmbedButtons = document.querySelectorAll('.figma-embed');
    
    figmaViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const figmaUrl = button.getAttribute('data-figma-url');
            if (figmaUrl) {
                window.open(figmaUrl, '_blank', 'noopener,noreferrer');
                
                // Track Figma view
                if (window.VercelAnalytics) {
                    window.VercelAnalytics.trackEvent('figma_view', {
                        url: figmaUrl
                    });
                }
            }
        });
    });
    
    figmaEmbedButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const embedUrl = button.getAttribute('data-figma-embed');
            const title = button.getAttribute('data-title') || 'Figma Design';
            
            if (embedUrl && liveDemoModal && liveDemoFrame) {
                currentDemoUrl = embedUrl;
                liveDemoTitle.textContent = title;
                liveDemoModal.classList.add('open');
                
                if (loadingSpinner) loadingSpinner.style.display = 'flex';
                
                liveDemoFrame.src = embedUrl;
                
                liveDemoFrame.onload = () => {
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
                    // Try to access iframe content
                    const iframeDoc = liveDemoFrame.contentDocument || liveDemoFrame.contentWindow.document;
                    if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                        console.log('Iframe appears to be blocked');
                        handleIframeError();
                    }
                } catch (e) {
                    // Cross-origin error is expected and means iframe loaded
                    console.log('Cross-origin check (expected):', e.message);
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
                url: url
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
                <button class="btn btn-primary" onclick="window.open('${escapeHTML(currentDemoUrl)}', '_blank')">
                    <i data-feather="external-link"></i>
                    Open in New Tab
                </button>
            </div>
        `;
        iframeContainer.appendChild(errorDiv);
        
        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    // Show loading help message
    function showLoadingHelp() {
        const iframeContainer = document.querySelector('.iframe-container');
        if (!iframeContainer || iframeContainer.querySelector('.loading-help')) return;
        
        const helpDiv = document.createElement('div');
        helpDiv.className = 'loading-help';
        helpDiv.innerHTML = `
            <p>Taking longer than expected?</p>
            <button class="btn btn-outline" onclick="window.open('${escapeHTML(currentDemoUrl)}', '_blank')">
                <i data-feather="external-link"></i>
                Open in New Tab
            </button>
        `;
        iframeContainer.appendChild(helpDiv);
        
        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
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
        
        // Also close project details modal
        closeProjectDetailsModal();
        
        // Also close video modal
        closeVideoModal();
    }
    
    // Close modal button handlers
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Check which modal this button belongs to
            const modal = button.closest('.modal');
            if (modal && modal.id === 'projectDetailsModal') {
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
                if (modal.id === 'projectDetailsModal') {
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
        if (e.key === 'Escape') {
            closeModal();
            closeProjectDetailsModal();
            closeVideoModal();
        }
    });
    
    // Open external button
    if (openExternalBtn) {
        openExternalBtn.addEventListener('click', () => {
            if (currentDemoUrl) {
                window.open(currentDemoUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }
    
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
    console.log('Found view details buttons:', viewDetailsButtons.length);
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            
            console.log('Opening project details:', projectId);
            
            if (projectId && projectDetails[projectId]) {
                openProjectDetails(projectId);
            }
        });
    });
    
    // Open project details modal
    function openProjectDetails(projectId) {
        const project = projectDetails[projectId];
        const modal = document.getElementById('projectDetailsModal');
        const titleElement = document.getElementById('projectDetailsTitle');
        const bodyElement = document.getElementById('projectDetailsBody');
        
        if (!modal || !titleElement || !bodyElement || !project) return;
        
        // Set title
        titleElement.textContent = project.title;
        
        // Build content
        let content = `
            <div class="project-details-content">
                <div class="project-description">
                    ${project.fullDescription}
                </div>
                
                <div class="project-meta">
                    <h4>🏷️ Technologieën</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tag">${escapeHTML(tech)}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-links">
                    ${project.liveUrl ? `
                        <a href="${escapeHTML(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                            <i data-feather="external-link"></i>
                            Live Demo
                        </a>
                    ` : ''}
                    ${project.githubUrl ? `
                        <a href="${escapeHTML(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                            <i data-feather="github"></i>
                            View Code
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        bodyElement.innerHTML = content;
        
        // Show modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        // Track details view
        if (window.VercelAnalytics) {
            window.VercelAnalytics.trackEvent('project_details_view', {
                project: projectId,
                title: project.title
            });
        }
    }
    
    // Close project details modal
    function closeProjectDetailsModal() {
        const modal = document.getElementById('projectDetailsModal');
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
    
    // Make closeProjectDetailsModal globally accessible
    window.closeProjectDetailsModal = closeProjectDetailsModal;
    
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
        const videoModal = document.getElementById('videoModal');
        const videoModalTitle = document.getElementById('videoModalTitle');
        const modalVideo = document.getElementById('modalVideo');
        
        if (!videoModal || !modalVideo) {
            console.error('Video modal elements not found');
            return;
        }
        
        // Set title
        if (videoModalTitle) {
            videoModalTitle.textContent = title;
        }
        
        // Set video source
        const source = modalVideo.querySelector('source');
        if (source) {
            source.src = videoUrl;
            modalVideo.load();
        }
        
        // Show modal
        videoModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        // Play video
        modalVideo.play().catch(err => {
            console.log('Video autoplay prevented:', err);
        });
        
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
    
    // ===== Social Links Tracking =====
    const socialLinks = document.querySelectorAll('a[href*="github.com"], a[href*="instagram.com"], a[href*="linkedin.com"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const url = link.getAttribute('href');
            let platform = 'unknown';
            
            if (url.includes('github.com')) platform = 'github';
            else if (url.includes('instagram.com')) platform = 'instagram';
            else if (url.includes('linkedin.com')) platform = 'linkedin';
            
            if (window.VercelAnalytics) {
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
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== Lazy Loading Images =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    console.log('Portfolio initialized successfully');
});
