document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        }
    });
    
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
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
                
                navMenu.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        
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
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
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
    
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
    
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    const resumeLinks = document.querySelectorAll('a[href="#"]');
    resumeLinks.forEach(link => {
        if (link.textContent.includes('Resume') || link.textContent.includes('Download')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Resume download will be available soon. Please contact me directly for now.');
            });
        }
    });
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(37, 99, 235, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            {
                transform: 'translateY(0px) scale(1)',
                opacity: 1
            },
            {
                transform: `translateY(-${window.innerHeight + 100}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }
    
    setInterval(createParticle, 300);
    
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
    
    const skillTags = document.querySelectorAll('.skill-tag, .skill-badge');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    const heroGreeting = document.querySelector('.hero-greeting');
    if (heroGreeting) {
        const originalText = heroGreeting.textContent;
        setTimeout(() => {
            typeWriter(heroGreeting, originalText, 150);
        }, 1000);
    }
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    document.addEventListener('mousemove', function(e) {
        const hero = document.querySelector('.hero');
        if (hero) {
            const rect = hero.getBoundingClientRect();
            if (rect.top <= 0 && rect.bottom >= 0) {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                
                hero.style.background = `radial-gradient(circle at ${x}% ${y}%, #667eea 0%, #764ba2 100%)`;
            }
        }
    });
    
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        const paragraphs = aboutText.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            p.style.animationDelay = `${index * 0.2}s`;
            p.classList.add('reveal');
        });
    }
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        setTimeout(() => {
            const loadingElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description');
            loadingElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 500);
    });
});