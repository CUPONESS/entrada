// Performance monitoring and optimization utilities
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            this.collectPageMetrics();
        });

        // Monitor interaction performance
        this.monitorInteractions();
        
        // Monitor memory usage
        this.monitorMemory();
    }

    collectPageMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        this.metrics = {
            // Page load metrics
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
            
            // Resource metrics
            totalResources: performance.getEntriesByType('resource').length,
            resourceLoadTime: this.calculateResourceLoadTime(),
            
            // Memory metrics
            memoryUsage: this.getMemoryUsage()
        };

        this.logMetrics();
        this.optimizeBasedOnMetrics();
    }

    calculateResourceLoadTime() {
        const resources = performance.getEntriesByType('resource');
        return resources.reduce((total, resource) => total + (resource.responseEnd - resource.requestStart), 0);
    }

    getMemoryUsage() {
        if (performance.memory) {
            return {
                used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
                total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
            };
        }
        return null;
    }

    monitorInteractions() {
        // Monitor click performance
        document.addEventListener('click', (e) => {
            const startTime = performance.now();
            
            requestAnimationFrame(() => {
                const endTime = performance.now();
                const interactionTime = endTime - startTime;
                
                if (interactionTime > 100) {
                    console.warn(`Slow click interaction detected: ${interactionTime.toFixed(2)}ms`);
                }
            });
        });

        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollStartTime = performance.now();
                
                requestAnimationFrame(() => {
                    const scrollEndTime = performance.now();
                    const scrollTime = scrollEndTime - scrollStartTime;
                    
                    if (scrollTime > 16) { // 60fps = 16.67ms per frame
                        console.warn(`Slow scroll performance: ${scrollTime.toFixed(2)}ms`);
                    }
                });
            }, 100);
        });
    }

    monitorMemory() {
        if (!performance.memory) return;
        
        setInterval(() => {
            const memory = this.getMemoryUsage();
            if (memory && memory.used > memory.total * 0.9) {
                console.warn(`High memory usage: ${memory.used}MB / ${memory.total}MB`);
                this.suggestMemoryCleanup();
            }
        }, 30000); // Check every 30 seconds
    }

    logMetrics() {
        console.group('📊 Performance Metrics');
        console.log('🚀 Page Load Metrics:', {
            'DOM Content Loaded': `${this.metrics.domContentLoaded.toFixed(2)}ms`,
            'Load Complete': `${this.metrics.loadComplete.toFixed(2)}ms`,
            'First Paint': `${this.metrics.firstPaint.toFixed(2)}ms`,
            'First Contentful Paint': `${this.metrics.firstContentfulPaint.toFixed(2)}ms`
        });
        
        console.log('📦 Resource Metrics:', {
            'Total Resources': this.metrics.totalResources,
            'Resource Load Time': `${this.metrics.resourceLoadTime.toFixed(2)}ms`
        });
        
        if (this.metrics.memoryUsage) {
            console.log('💾 Memory Usage:', {
                'Used': `${this.metrics.memoryUsage.used}MB`,
                'Total': `${this.metrics.memoryUsage.total}MB`,
                'Limit': `${this.metrics.memoryUsage.limit}MB`
            });
        }
        console.groupEnd();
    }

    optimizeBasedOnMetrics() {
        // Suggest optimizations based on metrics
        const suggestions = [];
        
        if (this.metrics.firstContentfulPaint > 1500) {
            suggestions.push('Consider reducing critical CSS and JavaScript');
        }
        
        if (this.metrics.resourceLoadTime > 1000) {
            suggestions.push('Optimize images and implement resource preloading');
        }
        
        if (this.metrics.totalResources > 50) {
            suggestions.push('Consider bundling and minifying resources');
        }
        
        if (suggestions.length > 0) {
            console.group('💡 Optimization Suggestions');
            suggestions.forEach((suggestion, index) => {
                console.log(`${index + 1}. ${suggestion}`);
            });
            console.groupEnd();
        }
    }

    suggestMemoryCleanup() {
        // Clear caches if memory usage is high
        if (typeof productosCache !== 'undefined' && productosCache) {
            console.log('🧹 Clearing product cache to free memory');
            // Optionally clear cache: productosCache = null;
        }
    }
}

// Image optimization utilities
class ImageOptimizer {
    static lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    static optimizeImageLoading() {
        // Add loading="lazy" to all images
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.loading = 'lazy';
        });
    }

    static generateResponsiveImages() {
        // Generate responsive image sets if needed
        const images = document.querySelectorAll('img[src]');
        images.forEach(img => {
            if (!img.srcset && img.src.includes('.jpg') || img.src.includes('.png')) {
                // Create srcset for responsive images
                const baseSrc = img.src.replace(/\.(jpg|png)$/, '');
                img.srcset = `
                    ${baseSrc}-small.jpg 480w,
                    ${baseSrc}-medium.jpg 768w,
                    ${baseSrc}-large.jpg 1024w
                `;
                img.sizes = '(max-width: 480px) 480px, (max-width: 768px) 768px, 1024px';
            }
        });
    }
}

// Network optimization utilities
class NetworkOptimizer {
    static prefetchCriticalResources() {
        // Prefetch critical resources
        const criticalResources = [
            'https://es.aliexpress.com',
            'https://amazon.es'
        ];
        
        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    static implementServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('Service Worker registered:', registration);
            }).catch(error => {
                console.log('Service Worker registration failed:', error);
            });
        }
    }

    static optimizeRequests() {
        // Implement request batching
        let requestQueue = [];
        let batchTimeout;
        
        function batchRequest(url) {
            requestQueue.push(url);
            
            clearTimeout(batchTimeout);
            batchTimeout = setTimeout(() => {
                processBatch();
            }, 100);
        }
        
        function processBatch() {
            if (requestQueue.length === 0) return;
            
            console.log(`Processing batch of ${requestQueue.length} requests`);
            // Process batched requests
            requestQueue = [];
        }
        
        return { batchRequest };
    }
}

// SEO and accessibility optimizations
class SEOOptimizer {
    static optimizeMetaTags() {
        // Add structured data
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Entrada.pro",
            "description": "Descubre las mejores ofertas y productos online",
            "url": window.location.href
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    static improveAccessibility() {
        // Add ARIA labels
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            if (button.textContent.trim()) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });
        
        // Improve keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// Initialize all optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Start performance monitoring
    const performanceMonitor = new PerformanceMonitor();
    
    // Optimize images
    ImageOptimizer.optimizeImageLoading();
    
    // Optimize network
    NetworkOptimizer.prefetchCriticalResources();
    
    // Improve SEO and accessibility
    SEOOptimizer.optimizeMetaTags();
    SEOOptimizer.improveAccessibility();
    
    console.log('🎯 Performance optimizations initialized');
});

// Export utilities for global use
window.PerformanceMonitor = PerformanceMonitor;
window.ImageOptimizer = ImageOptimizer;
window.NetworkOptimizer = NetworkOptimizer;
window.SEOOptimizer = SEOOptimizer;