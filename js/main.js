// Main JavaScript for Ruben's Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
        updateThemeIcon();
    });
    
    function updateThemeIcon() {
        const isDark = body.classList.contains('dark-theme');
        document.querySelector('.light-icon').style.display = isDark ? 'block' : 'none';
        document.querySelector('.dark-icon').style.display = isDark ? 'none' : 'block';
    }
    
    // Initialize theme icon
    updateThemeIcon();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonials.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    if (prevBtn && nextBtn && dots.length) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        });
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
            });
        });
        
        // Initialize slider
        showSlide(0);
    }
    
    // Project modal functionality
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeModal = modal.querySelector('.close-modal');
    const viewProjectBtns = document.querySelectorAll('.view-project');
    
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const projectCard = btn.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectDesc = projectCard.querySelector('p').textContent;
            const projectImage = projectCard.querySelector('.project-image').style.backgroundImage;
            const projectTags = projectCard.querySelector('.project-tags').innerHTML;
            
            modalBody.innerHTML = `
                <div class="modal-project-image" style="${projectImage}"></div>
                <h2>${projectTitle}</h2>
                <p class="modal-project-desc">${projectDesc}</p>
                <div class="modal-project-tags">${projectTags}</div>
                <div class="modal-project-content">
                    <p>This is a detailed description of the ${projectTitle} project. In a real implementation, this would contain comprehensive information about the project, including the challenges faced, solutions implemented, technologies used, and outcomes achieved.</p>
                    <p>The project showcases my skills in design, development, and problem-solving, demonstrating my ability to create effective and visually appealing solutions.</p>
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close modal when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Basic validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill in all fields');
                return;
            }
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-feather="loader"></i> Sending...';
            feather.replace();
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameInput.value,
                        email: emailInput.value,
                        message: messageInput.value
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <i data-feather="check-circle"></i>
                            <h3>Message Sent!</h3>
                            <p>Thank you for your message. I'll get back to you soon.</p>
                        </div>
                    `;
                    feather.replace();
                } else {
                    throw new Error(data.error || 'Something went wrong');
                }
            } catch (error) {
                // Show error message
                alert(`Error: ${error.message}`);
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button');
            
            // Basic validation
            if (!emailInput.value) {
                alert('Please enter your email address');
                return;
            }
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-feather="loader"></i>';
            feather.replace();
            
            try {
                const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailInput.value
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    const formParent = newsletterForm.parentElement;
                    formParent.innerHTML = `
                        <div class="success-message">
                            <i data-feather="check-circle"></i>
                            <p>Thank you for subscribing!</p>
                        </div>
                    `;
                    feather.replace();
                } else {
                    if (response.status === 409) {
                        throw new Error('You are already subscribed');
                    } else {
                        throw new Error(data.error || 'Something went wrong');
                    }
                }
            } catch (error) {
                // Show error message
                alert(`Error: ${error.message}`);
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i data-feather="send"></i>';
                feather.replace();
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
});
