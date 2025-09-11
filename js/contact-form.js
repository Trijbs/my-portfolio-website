/**
 * Enhanced Contact Form Handler
 * Handles form submission with validation, loading states, and error handling
 */

class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitButton = null;
        this.originalButtonText = '';
        this.apiEndpoint = this.determineApiEndpoint();
        
        this.init();
    }

    determineApiEndpoint() {
        // Check if we're in development (localhost)
        const isLocalhost = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' ||
                           window.location.hostname === '';

        // Check if we're on Vercel
        const isVercel = window.location.hostname.includes('vercel.app') ||
                        window.location.hostname === 'trijbsworld.nl';

        if (isLocalhost) {
            // For local development with Vercel CLI
            return '/api/contact';
        } else if (isVercel || window.location.protocol === 'https:') {
            // For production on Vercel or custom domain
            return '/api/contact';
        } else {
            // Fallback for other hosting (GitHub Pages, etc.)
            // You might want to use a different endpoint here
            return '/api/contact';
        }
    }

    init() {
        if (!this.form) {
            console.warn('Contact form not found');
            return;
        }

        this.submitButton = this.form.querySelector('button[type="submit"]');
        if (this.submitButton) {
            this.originalButtonText = this.submitButton.innerHTML;
        }

        this.setupEventListeners();
        this.setupValidation();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupValidation() {
        // Add validation styles
        const style = document.createElement('style');
        style.textContent = `
            .form-group.error input,
            .form-group.error textarea,
            .form-group.error select {
                border-color: #ff4444 !important;
                box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.2) !important;
            }
            
            .form-group.success input,
            .form-group.success textarea,
            .form-group.success select {
                border-color: #00ff88 !important;
                box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2) !important;
            }
            
            .field-error {
                color: #ff4444;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                display: block;
            }
            
            .field-success {
                color: #00ff88;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                display: block;
            }
            
            .form-notification {
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                font-weight: 500;
            }
            
            .form-notification.success {
                background: rgba(0, 255, 136, 0.1);
                border: 1px solid #00ff88;
                color: #00ff88;
            }
            
            .form-notification.error {
                background: rgba(255, 68, 68, 0.1);
                border: 1px solid #ff4444;
                color: #ff4444;
            }
            
            .form-notification.info {
                background: rgba(0, 212, 255, 0.1);
                border: 1px solid #00d4ff;
                color: #00d4ff;
            }
            
            .loading-spinner {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid #333;
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s ease-in-out infinite;
                margin-right: 0.5rem;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Clear previous notifications
        this.clearNotifications();
        
        // Validate form
        if (!this.validateForm()) {
            this.showNotification('Please fix the errors below', 'error');
            return;
        }
        
        // Get form data
        const formData = this.getFormData();
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Track form submission attempt
            if (window.track) {
                window.track('contact_form_submit', {
                    subject: formData.subject,
                    messageLength: formData.message.length
                });
            }
            
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.handleSuccess(result);
            } else {
                this.handleError(result);
            }
            
        } catch (error) {
            console.error('Contact form error:', error);
            this.handleNetworkError(error);
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const formGroup = field.closest('.form-group');
        
        // Clear previous validation
        this.clearFieldError(field);
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${this.getFieldLabel(field)} is required`;
            isValid = false;
        }
        
        // Specific field validations
        if (value && fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        if (value && fieldName === 'name') {
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            }
            if (value.length > 100) {
                errorMessage = 'Name is too long';
                isValid = false;
            }
        }
        
        if (value && fieldName === 'message') {
            if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters long';
                isValid = false;
            }
            if (value.length > 5000) {
                errorMessage = 'Message is too long (max 5000 characters)';
                isValid = false;
            }
        }
        
        // Show validation result
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else if (value) {
            this.showFieldSuccess(field);
        }
        
        return isValid;
    }

    getFieldLabel(field) {
        const label = this.form.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }

    showFieldSuccess(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
        
        // Remove error message
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error', 'success');
        
        const errorElement = formGroup.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    getFormData() {
        const formData = new FormData(this.form);
        return {
            name: formData.get('name').trim(),
            email: formData.get('email').trim().toLowerCase(),
            subject: formData.get('subject') || 'General Inquiry',
            message: formData.get('message').trim()
        };
    }

    handleSuccess(result) {
        // Track successful submission
        if (window.track) {
            window.track('contact_form_success', {
                messageId: result.messageId
            });
        }
        
        this.showNotification(
            '✅ Message sent successfully! You should receive a confirmation email shortly.',
            'success'
        );
        
        // Reset form
        this.form.reset();
        
        // Clear all validation states
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        });
        
        // Show additional success message
        setTimeout(() => {
            this.showNotification(
                '📧 I typically respond within 24 hours. Thank you for reaching out!',
                'info'
            );
        }, 3000);
    }

    handleError(result) {
        // Track form error
        if (window.track) {
            window.track('contact_form_error', {
                errors: result.errors || [result.message]
            });
        }
        
        if (result.errors && Array.isArray(result.errors)) {
            // Show field-specific errors
            result.errors.forEach(error => {
                this.showNotification(error, 'error');
            });
        } else {
            this.showNotification(result.message || 'An error occurred. Please try again.', 'error');
        }
    }

    handleNetworkError(error) {
        // Track network error
        if (window.track) {
            window.track('contact_form_network_error', {
                error: error.message
            });
        }
        
        this.showNotification(
            '🌐 Unable to send message. Please check your internet connection or contact me directly at rbdegroot@gmail.com',
            'error'
        );
    }

    setLoadingState(loading) {
        if (!this.submitButton) return;
        
        if (loading) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = `
                <span class="loading-spinner"></span>
                Sending Message...
            `;
        } else {
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = this.originalButtonText;
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        this.clearNotifications();
        
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = message;
        
        // Insert before form
        this.form.parentNode.insertBefore(notification, this.form);
        
        // Auto-remove success/info notifications after 10 seconds
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 10000);
        }
        
        // Scroll to notification
        notification.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    clearNotifications() {
        const notifications = document.querySelectorAll('.form-notification');
        notifications.forEach(notification => notification.remove());
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormHandler();
});

// Export for global access
window.ContactFormHandler = ContactFormHandler;