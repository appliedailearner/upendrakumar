/* =============================================
   UPENDRA KUMAR - PERSONAL BRANDING WEBSITE
   JavaScript - Animations & Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
    initScrollIndicator();

    // New conversion optimization features
    initStickyCTA();
    initExitIntent();
    initAnalytics();

    // Hide page loader after a short delay (reduced from 1500ms to 500ms for better performance)
    setTimeout(() => {
        const pageLoader = document.getElementById('pageLoader');
        if (pageLoader) {
            pageLoader.classList.add('hidden');
        }
    }, 500);
});

/* ===== NAVBAR ===== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;

        // Add scrolled class for background change
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        const scrollPosition = currentScrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Initial call
    updateNavbar();
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const navLinks = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                // Immediately update active state on click
                if (link.classList.contains('nav-links') || link.closest('.nav-links')) {
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    const clickedNavLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
                    if (clickedNavLink) {
                        clickedNavLink.classList.add('active');
                    }
                }

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===== PARALLAX EFFECTS (Enhanced) ===== */
function initParallax() {
    const heroGradients = document.querySelectorAll('.hero-gradient');
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image-wrapper');
    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        const heroHeight = hero ? hero.offsetHeight : 800;

        // Only apply parallax when hero is visible
        if (scrollY < heroHeight) {
            heroGradients.forEach((gradient, index) => {
                const speed = 0.08 + (index * 0.04);
                const yOffset = scrollY * speed;
                const xOffset = scrollY * speed * 0.3;
                const scale = 1 + (scrollY * 0.0001);
                gradient.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
            });

            // Subtle parallax on hero image
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrollY * 0.05}px)`;
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/* ===== SCROLL INDICATOR ===== */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    let hidden = false;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 && !hidden) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
            hidden = true;
        } else if (window.scrollY <= 100 && hidden) {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
            hidden = false;
        }
    });
}

/* ===== TYPING EFFECT (Optional Enhancement) ===== */
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

/* ===== COUNTER ANIMATION ===== */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;

        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

/* ===== LAZY LOADING IMAGES ===== */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/* ===== THEME TOGGLE (Future Enhancement) ===== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/* ===== CONSOLE EASTER EGG ===== */
console.log(`
%c🚀 Upendra Kumar | Azure API Management Expert
%cBuilt with passion for cloud architecture and beautiful web experiences.

%cInterested in working together?
→ Book a strategy call: https://mypivot.work/industry-mentors/Upendra-Kumar
→ LinkedIn: https://www.linkedin.com/in/journeytocloudwithupendra/
`,
    'color: #0078D4; font-size: 16px; font-weight: bold;',
    'color: #94a3b8; font-size: 12px;',
    'color: #7c3aed; font-size: 12px;'
);

/* ===== STICKY CTA BAR ===== */
function initStickyCTA() {
    const stickyCTA = document.getElementById('stickyCTA');
    if (!stickyCTA) return;

    let shown = false;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        if (scrollY > heroHeight && !shown) {
            stickyCTA.classList.add('visible');
            shown = true;
        } else if (scrollY <= heroHeight && shown) {
            stickyCTA.classList.remove('visible');
            shown = false;
        }
    });
}

/* ===== EXIT INTENT POPUP ===== */
function initExitIntent() {
    const modal = document.getElementById('exitIntentModal');
    if (!modal) return;

    let exitIntentShown = localStorage.getItem('exitIntentSeen');
    let mouseLeft = false;

    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitIntentShown && !mouseLeft) {
            showModal('exitIntentModal');
            mouseLeft = true;
            localStorage.setItem('exitIntentSeen', 'true');

            // Track event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exit_intent_shown', {
                    'event_category': 'engagement'
                });
            }
        }
    });
}

/* ===== MODAL MANAGEMENT ===== */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(overlay.id);
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            closeModal(modal.id);
        });
    }
});

/* ===== EMAIL SIGNUP HANDLING ===== */
function handleEmailSignup(event, source) {
    // DON'T prevent default - let EmailOctopus form submit naturally
    // event.preventDefault(); // REMOVED to allow EmailOctopus to work

    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value;

    // Validate email
    if (!email || !email.includes('@')) {
        event.preventDefault(); // Only prevent if invalid
        alert('⚠️ Please enter a valid email address');
        return;
    }

    // Track the signup
    if (typeof gtag !== 'undefined') {
        gtag('event', 'email_signup', {
            'event_category': 'conversion',
            'event_label': source,
            'value': 10
        });
    }

    // Store email in localStorage for tracking
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
    }

    // Log for tracking
    console.log(`Email signup from ${source}:`, email);
    console.log('Total subscribers:', subscribers.length);

    // Trigger download immediately (before form submits)
    triggerChecklistDownload();

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #0078D4 0%, #7c3aed 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 1rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        z-index: 10001;
        text-align: center;
        max-width: 500px;
    `;
    successMessage.innerHTML = `
        <h2 style="margin: 0 0 1rem 0; font-size: 1.5rem;">🎉 Request Successful!</h2>
        <p style="margin: 0 0 1rem 0; font-size: 1rem; line-height: 1.6;">
            <strong>Check your email</strong> for the Azure APIM Architecture Checklist.<br>
            (Also check your spam folder just in case!)
        </p>
        <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">
            Welcome to 2,500+ cloud architects! 🚀
        </p>
    `;
    document.body.appendChild(successMessage);

    // Remove success message after 4 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.3s ease';
        setTimeout(() => successMessage.remove(), 300);
    }, 4000);

    // Close modal if in modal (after a delay to allow form submission)
    setTimeout(() => {
        const modal = form.closest('.modal-overlay');
        if (modal) {
            closeModal(modal.id);
        }
    }, 500);

    // Form will submit naturally to EmailOctopus
    // No need to reset form - EmailOctopus will handle redirect
}

/* ===== TRIGGER CHECKLIST DOWNLOAD ===== */
function triggerChecklistDownload() {
    // TODO: Replace this with actual PDF file once created
    // For now, create a placeholder text file
    const checklistContent = `
AZURE APIM ARCHITECTURE CHECKLIST
==================================

The exact 47-point checklist used for Fortune 500 API implementations

PLANNING & DESIGN
-----------------
☐ Define API strategy and governance model
☐ Identify API consumers and use cases
☐ Design API versioning strategy
☐ Plan for API lifecycle management
☐ Define SLA and performance requirements

SECURITY
--------
☐ Implement OAuth 2.0 / OpenID Connect
☐ Configure API keys and subscription management
☐ Set up IP whitelisting/blacklisting
☐ Implement rate limiting and throttling
☐ Enable CORS policies
☐ Configure SSL/TLS certificates
☐ Implement JWT validation
☐ Set up Azure AD integration

NETWORKING
----------
☐ Configure VNet integration
☐ Set up private endpoints
☐ Configure custom domains
☐ Implement Azure Front Door/CDN
☐ Set up DDoS protection

POLICIES
--------
☐ Implement request/response transformation
☐ Configure caching policies
☐ Set up retry policies
☐ Implement circuit breaker pattern
☐ Configure logging policies
☐ Set up mock responses for testing

MONITORING & LOGGING
--------------------
☐ Enable Application Insights
☐ Configure diagnostic logs
☐ Set up alerts and notifications
☐ Implement custom metrics
☐ Configure log retention policies

PERFORMANCE
-----------
☐ Optimize caching strategy
☐ Configure backend connection pooling
☐ Implement response compression
☐ Set up CDN for static content
☐ Optimize policy execution order

DEPLOYMENT
----------
☐ Implement CI/CD pipelines
☐ Configure deployment slots
☐ Set up blue-green deployment
☐ Implement infrastructure as code
☐ Configure backup and restore

COMPLIANCE
----------
☐ Implement data residency requirements
☐ Configure audit logging
☐ Set up compliance reporting
☐ Implement GDPR/privacy controls

COST OPTIMIZATION
-----------------
☐ Right-size APIM tier
☐ Implement caching to reduce backend calls
☐ Optimize API call patterns
☐ Monitor and analyze usage patterns

---
For personalized guidance on your API architecture:
Book a weekend mentorship session: ₹5,000/hour
https://upendrakumar.com

© ${new Date().getFullYear()} Upendra Kumar
`;

    // Create blob and download
    const blob = new Blob([checklistContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Azure-APIM-Architecture-Checklist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // TODO: Replace with actual PDF download
    // const pdfUrl = '/assets/downloads/Azure-APIM-Architecture-Checklist.pdf';
    // window.open(pdfUrl, '_blank');
}

/* ===== WAITLIST SIGNUP ===== */
function showWaitlistForm(product) {
    showModal('waitlistModal');

    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'waitlist_interest', {
            'event_category': 'engagement',
            'event_label': product
        });
    }
}

function handleWaitlistSignup(event) {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;

    // Track the signup
    if (typeof gtag !== 'undefined') {
        gtag('event', 'waitlist_signup', {
            'event_category': 'conversion',
            'event_label': 'masterclass',
            'value': 20
        });
    }

    // TODO: Integrate with your email service
    console.log('Waitlist signup:', email);

    // Show success message
    alert('🎓 You\'re on the list!\n\nYou\'ll be the first to know when the Masterclass opens.\n\nEarly bird pricing: $497 (save $500)');

    closeModal('waitlistModal');
    form.reset();
}

/* ===== ANALYTICS TRACKING ===== */
function initAnalytics() {
    // Track CTA clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': btn.textContent.trim(),
                    'value': 1
                });
            }
        });
    });

    // Track roadmap clicks
    document.querySelectorAll('.roadmap-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3');
            if (title && typeof gtag !== 'undefined') {
                gtag('event', 'roadmap_click', {
                    'event_category': 'engagement',
                    'event_label': title.textContent,
                    'value': 5
                });
            }
        });
    });

    // Track scroll depth
    let scrollDepths = [25, 50, 75, 100];
    let trackedDepths = [];

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                trackedDepths.push(depth);
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_depth', {
                        'event_category': 'engagement',
                        'event_label': `${depth}%`,
                        'value': depth
                    });
                }
            }
        });
    });
}
