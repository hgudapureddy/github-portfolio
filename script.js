document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const resumeBtn = document.querySelector('.resume-btn');
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Mobile menu toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenu.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    mobileMenu.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Resume button functionality
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            // Let the browser handle the PDF download naturally
            // The href="assets/Resume.pdf" will work if the file exists
            console.log('Resume button clicked - attempting to open:', this.getAttribute('href'));
        });
    }
    
    function showResumeModal() {
        // Create modal for resume download
        const modal = document.createElement('div');
        modal.className = 'resume-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Resume Download</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>My resume will be available for download soon. In the meantime, feel free to:</p>
                    <div class="modal-actions">
                        <a href="mailto:gharshith2000@gmail.com" class="modal-btn modal-btn-primary">
                            <i class="fas fa-envelope"></i>
                            Email Me
                        </a>
                        <a href="https://linkedin.com/in/harshith-gudapureddy" target="_blank" class="modal-btn modal-btn-secondary">
                            <i class="fab fa-linkedin"></i>
                            LinkedIn Profile
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            <style>
                .resume-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                }
                
                .modal-content {
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                    animation: slideUp 0.3s ease;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .modal-header h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #0f172a;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #64748b;
                    padding: 0.25rem;
                    line-height: 1;
                }
                
                .modal-close:hover {
                    color: #0f172a;
                }
                
                .modal-body {
                    padding: 1.5rem;
                }
                
                .modal-body p {
                    margin-bottom: 1.5rem;
                    color: #475569;
                    line-height: 1.6;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                
                .modal-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    flex: 1;
                    justify-content: center;
                }
                
                .modal-btn-primary {
                    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                    color: white;
                }
                
                .modal-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }
                
                .modal-btn-secondary {
                    background: #f1f5f9;
                    color: #475569;
                    border: 1px solid #e2e8f0;
                }
                
                .modal-btn-secondary:hover {
                    background: #e2e8f0;
                    color: #0f172a;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', modalStyles);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        }
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        
        // Add fadeOut animation
        const fadeOutKeyframes = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.insertAdjacentHTML('beforeend', `<style>${fadeOutKeyframes}</style>`);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .stat-card, .timeline-item, .contact-card, .about-content, .vision-card, .coming-soon-card');
    animateElements.forEach(el => observer.observe(el));
    
    // Animated counters for stats
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace('+', ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const displayValue = Math.floor(current);
            element.textContent = element.textContent.includes('+') ? `${displayValue}+` : displayValue;
        }, 16);
    }
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    animateCounter(statNumber);
                }
            }
        });
    }, { threshold: 0.5 });
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => statsObserver.observe(card));
    
    // Parallax effect for hero section
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            const rate = scrolled * -0.3;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    }
    
    window.addEventListener('scroll', handleParallax);
    
    // Enhanced hover effects for cards
    function addCardHoverEffects() {
        const cards = document.querySelectorAll('.skill-card, .stat-card, .timeline-content, .contact-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    addCardHoverEffects();
    
    // Skill tags interactive effects
    function addSkillTagEffects() {
        const skillTags = document.querySelectorAll('.skill-tag, .skill-badge');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    addSkillTagEffects();
    
    // Typewriter effect for hero greeting
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        
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
    
    // Initialize typewriter effect
    const greetingText = document.querySelector('.greeting-text');
    if (greetingText) {
        const originalText = greetingText.textContent;
        setTimeout(() => {
            typeWriter(greetingText, originalText, 120);
        }, 1500);
    }
    
    // Contact form interactions (if form is added later)
    function enhanceContactCards() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    enhanceContactCards();
    
    // Floating elements animation
    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const delay = index * 0.5;
            const duration = 6 + (index * 2);
            
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
        });
    }
    
    animateFloatingElements();
    
    // Smooth reveal animations with stagger
    function staggerRevealAnimations() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const elements = section.querySelectorAll('.skill-card, .stat-card, .timeline-item, .contact-card');
            
            elements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }
    
    staggerRevealAnimations();
    
    // Button hover effects
    function addButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .resume-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    addButtonEffects();
    
    // Loading animation
    function initializeLoadingAnimation() {
        document.body.style.opacity = '0';
        
        window.addEventListener('load', function() {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
            
            // Trigger hero animations
            setTimeout(() => {
                const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .hero-description, .hero-cta');
                heroElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('fade-in-up');
                    }, index * 200);
                });
            }, 300);
        });
    }
    
    initializeLoadingAnimation();
    
    // Performance optimization: Throttle scroll events
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
    
    // Apply throttling to scroll events
    window.removeEventListener('scroll', handleNavbarScroll);
    window.removeEventListener('scroll', updateActiveNavLink);
    window.removeEventListener('scroll', handleParallax);
    
    window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    window.addEventListener('scroll', throttle(handleParallax, 10));
    
    // Keyboard navigation support
    function addKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Close modal on Escape key
            if (e.key === 'Escape') {
                const modal = document.querySelector('.resume-modal');
                if (modal) {
                    modal.querySelector('.modal-close').click();
                }
                
                // Close mobile menu on Escape key
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    }
    
    addKeyboardNavigation();
    
    // Touch gestures for mobile
    function addTouchGestures() {
        let touchStartY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', function(e) {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            // Detect swipe down to close mobile menu
            if (diff < -50 && navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }
    
    addTouchGestures();
    
    // Intersection Observer for timeline items
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
        timelineObserver.observe(item);
    });
    
    // Add custom cursor effect for interactive elements
    function addCustomCursor() {
        if (window.innerWidth > 768) { // Only on desktop
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
            document.body.appendChild(cursor);
            
            // Add cursor styles
            const cursorStyles = `
                <style>
                    .custom-cursor {
                        position: fixed;
                        pointer-events: none;
                        z-index: 9999;
                        mix-blend-mode: difference;
                    }
                    
                    .cursor-dot {
                        width: 6px;
                        height: 6px;
                        background: #3b82f6;
                        border-radius: 50%;
                        position: fixed;
                        transform: translate(-50%, -50%);
                        transition: width 0.3s, height 0.3s;
                    }
                    
                    .cursor-outline {
                        width: 30px;
                        height: 30px;
                        border: 2px solid rgba(59, 130, 246, 0.5);
                        border-radius: 50%;
                        position: fixed;
                        transform: translate(-50%, -50%);
                        transition: all 0.3s ease;
                    }
                    
                    .custom-cursor.hover .cursor-dot {
                        width: 12px;
                        height: 12px;
                    }
                    
                    .custom-cursor.hover .cursor-outline {
                        width: 40px;
                        height: 40px;
                        border-color: #3b82f6;
                    }
                </style>
            `;
            
            document.head.insertAdjacentHTML('beforeend', cursorStyles);
            
            // Track mouse movement
            document.addEventListener('mousemove', function(e) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
            
            // Add hover effects
            const hoverElements = document.querySelectorAll('a, button, .skill-card, .stat-card, .contact-card');
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
        }
    }
    
    addCustomCursor();
    
    console.log('Portfolio initialized successfully! 🚀');
});