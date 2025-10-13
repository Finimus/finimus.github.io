// Main JavaScript file for Portfolio Clone
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('hidden');
        document.body.style.overflow = mobileMenu.classList.contains('hidden') ? 'auto' : 'hidden';
    }
    
    mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    mobileMenu?.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            toggleMobileMenu();
        }
    });
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    
    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('bg-black/95');
            navbar.classList.remove('bg-black/80');
        } else {
            navbar.classList.add('bg-black/80');
            navbar.classList.remove('bg-black/95');
        }
        
        // Hide navbar when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }
    
    window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
    
    // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function highlightActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-400');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('text-blue-400');
            }
        });
    }
    
    window.addEventListener('scroll', throttle(highlightActiveNav, 10));
    
    // ===== FORM HANDLING =====
    const contactForm = document.querySelector('#contact form');
    
    contactForm?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            this.reset();
            
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);
    
    // Observe all sections and project cards
    document.querySelectorAll('section, .project-card').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
        observer.observe(el);
    });
    
    // ===== PROJECT CARD INTERACTIONS =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== TYPING ANIMATION =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Apply typing animation to hero title
    const heroTitle = document.querySelector('#home h1 span:last-child');
    if (heroTitle) {
        setTimeout(() => {
            typeWriter(heroTitle, 'a Developer', 150);
        }, 1000);
    }
    
    // ===== CURSOR TRAIL EFFECT =====
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    function updateCursor() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        const cursor = document.querySelector('.cursor-trail');
        if (cursor) {
            cursor.style.left = trailX + 'px';
            cursor.style.top = trailY + 'px';
        }
        
        requestAnimationFrame(updateCursor);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Create cursor trail element
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail fixed w-6 h-6 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference opacity-50';
    cursorTrail.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursorTrail);
    
    updateCursor();
    
    // ===== SCROLL PROGRESS INDICATOR =====
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 transition-all duration-300';
    scrollProgress.style.width = '0%';
    document.body.appendChild(scrollProgress);
    
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
    
    window.addEventListener('scroll', throttle(updateScrollProgress, 10));
    
    // ===== THEME TOGGLE (if needed) =====
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'fixed bottom-6 right-6 w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 z-40 shadow-lg';
        themeToggle.innerHTML = `
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
        `;
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            // Add theme switching logic here if needed
        });
        
        document.body.appendChild(themeToggle);
    }
    
    // Uncomment to add theme toggle
    // createThemeToggle();
    
    // ===== UTILITY FUNCTIONS =====
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 
            'bg-blue-600'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Lazy load images when they enter viewport
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    function preloadResource(href, as = 'style') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
    }
    
    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Could send error reports to analytics service
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });
    
    // ===== INITIALIZE EVERYTHING =====
    console.log('Portfolio Clone initialized successfully! 🚀');
});

// ===== SERVICE WORKER REGISTRATION (if needed) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered with scope: ', registration.scope);
            }, function(error) {
                console.log('SW registration failed: ', error);
            });
    });
}

// ===== ANALYTICS (placeholder) =====
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
    // Example: gtag('event', eventName, properties);
}