// Performance-optimized JavaScript with accessibility
(function() {
    'use strict';
    
    // Cache DOM elements
    const cache = {
        body: document.body,
        buttons: document.querySelectorAll('.primary-btn, .secondary-btn'),
        benefitCards: document.querySelectorAll('.benefit-card'),
        blogCards: document.querySelectorAll('.blog-card')
    };
    
    // Performance monitoring
    const perf = {
        startTime: performance.now(),
        mark: function(name) {
            if (performance.mark) {
                performance.mark(name);
            }
        },
        measure: function(name, startMark) {
            if (performance.measure) {
                performance.measure(name, startMark);
                console.log(`${name}: ${performance.getEntriesByName(name)[0].duration}ms`);
            }
        }
    };
    
    // Initialize
    function init() {
        perf.mark('init-start');
        
        // Add ARIA labels for better accessibility
        cache.buttons.forEach(button => {
            if (!button.getAttribute('aria-label')) {
                const text = button.textContent.trim();
                button.setAttribute('aria-label', text);
            }
        });
        
        // Optimized scroll animations
        setupScrollAnimations();
        
        // Enhanced button interactions
        setupButtonInteractions();
        
        // Lazy loading for images
        setupLazyLoading();
        
        perf.mark('init-end');
        perf.measure('init-time', 'init-start', 'init-end');
    }
    
    // Optimized scroll animations with Intersection Observer
    function setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe elements
            [...cache.benefitCards, ...cache.blogCards].forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }
    }
    
    // Enhanced button interactions
    function setupButtonInteractions() {
        cache.buttons.forEach(button => {
            // Mouse events
            button.addEventListener('mouseenter', handleButtonHover);
            button.addEventListener('mouseleave', handleButtonLeave);
            
            // Keyboard events
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleButtonHover.call(button);
                }
            });
            
            button.addEventListener('keyup', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleButtonLeave.call(button);
                }
            });
        });
    }
    
    function handleButtonHover() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
    }
    
    function handleButtonLeave() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    }
    
    // Lazy loading for images
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Smooth scroll with reduced motion support
    function setupSmoothScroll() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion) {
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
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Setup smooth scroll
    setupSmoothScroll();
    
})();
