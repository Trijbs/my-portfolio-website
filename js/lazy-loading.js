// Lazy Loading Implementation
// This script loads images only when they're about to enter the viewport

class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.imageObserver = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px', // Start loading 50px before the image enters viewport
                threshold: 0.01
            });

            this.images.forEach(img => {
                this.imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }

    loadImage(img) {
        // Check if browser supports WebP
        if (this.supportsWebP() && img.dataset.webp) {
            img.src = img.dataset.webp;
        } else {
            img.src = img.dataset.src;
        }
        
        img.classList.add('loaded');
        img.removeAttribute('data-src');
        img.removeAttribute('data-webp');
    }

    loadAllImages() {
        this.images.forEach(img => {
            this.loadImage(img);
        });
    }

    supportsWebP() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => resolve(webP.height === 2);
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LazyImageLoader();
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    img[data-src] {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
        background-size: 400% 100%;
        animation: shimmer 1.5s ease-in-out infinite;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    @keyframes shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
    }
`;
document.head.appendChild(style);