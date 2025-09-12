/**
 * Enhanced Contact Form Handler
 * Handles form submission with validation, loading states, and error handling
 */

class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitButton = null;
        this.originalButtonText = '';
        this.apiEndpoint = '/api/contact';
        
        this.init();
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
        // Add required field indicators
        const requiredFields = this.form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const label = this.form.querySelector(`label[for="${field.id}"]`);
            if (label && !label.textContent.includes('*')) {
                label.innerHTML += ' <span style="color: var(--accent-secondary);">*</span>';
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        this.setLoadingState(true);

        try {
            const formData = this.getFormData();
            const response = await this.submitForm(formData);

            if (response.success) {
                this.showSuccess(response.message);
                this.resetForm();
                
                // Track successful contact form submission
                if (window.VercelAnalytics) {
                    window.VercelAnalytics.trackContactSubmission();
                }
            } else {
                this.showError(response.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('Sorry, there was an error sending your message. Please try again or contact me directly at rbdegroot@gmail.com');
        } finally {
            this.setLoadingState(false);
        }
    }

    async submitForm(formData) {
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        // Log the response for debugging
        console.log('Contact form response:', {
            status: response.status,
            success: result.success,
            message: result.message,
            error: result.error
        });

        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }

        return result;
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        return data;
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        // Name validation
        else if (field.name === 'name' && value && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long';
            isValid = false;
        }
        // Message validation
        else if (field.name === 'message' && value && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = 'var(--accent-secondary)';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: var(--accent-secondary);
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setLoadingState(loading) {
        if (!this.submitButton) return;

        if (loading) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 16px; height: 16px; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    Sending...
                </div>
            `;
        } else {
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = this.originalButtonText;
        }
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        messageElement.style.cssText = `
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' 
                : 'background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;'
            }
        `;
        messageElement.textContent = message;

        // Insert at the top of the form
        this.form.insertBefore(messageElement, this.form.firstChild);

        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 5000);
        }
    }

    resetForm() {
        this.form.reset();
        
        // Clear any remaining field errors
        const errorElements = this.form.querySelectorAll('.field-error');
        errorElements.forEach(error => error.remove());
        
        // Reset field styles
        const fields = this.form.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            field.style.borderColor = '';
        });
    }
}

// Initialize the contact form handler when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormHandler();
});

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);