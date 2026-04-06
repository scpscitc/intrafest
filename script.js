/* ========================================
   SCPSC IT FEST 2026 - JavaScript
   ======================================== */

// ========================================
// NAVIGATION
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Update active nav link based on current page
window.addEventListener('load', () => {
    setActiveNavLink();
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========================================
// COUNTDOWN TIMER
// ========================================

function initCountdown() {
    // Event date: April 9, 2026 at 9:00 AM
    const eventDate = new Date('April 9, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            // Event has started
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        // Calculate time segments
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Initial update and then update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize countdown on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
} else {
    initCountdown();
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll('.reveal-on-scroll');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Element is in viewport
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('revealed');
        }
    });
}

// Initial check and then on scroll
if (revealElements.length > 0) {
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll, { passive: true });
}

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = 80; // Height of fixed navbar
            const offsetTop = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// STICKY NAVBAR
// ========================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
    }
}, { passive: true });

// ========================================
// FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Create message indicating form submission
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        
        // Log submission (in real scenario, this would be sent to server)
        console.log('Form submitted:', {
            name: name,
            email: email,
            subject: subject
        });
        
        // Show success message
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent Successfully!';
        submitBtn.style.background = 'linear-gradient(135deg, #00f7ff 0%, #8a7dff 100%)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// ========================================
// INTERSECTION OBSERVER FOR BETTER PERFORMANCE
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
revealElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// EVENT CARD INTERACTIVITY
// ========================================

const eventCards = document.querySelectorAll('.event-card, .event-preview-card, .highlight-card');

eventCards.forEach(card => {
    // Add subtle hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease-out';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease-out';
    });
});

// ========================================
// RESPONSIVE SIDEBAR NAVIGATION (Rules Page)
// ========================================

const sidebarLinks = document.querySelectorAll('.sidebar-link');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        sidebarLinks.forEach(l => l.style.color = '');
        
        // Add active styling to clicked link
        this.style.color = 'var(--accent-cyan)';
    });
});

// ========================================
// PARALLAX EFFECT FOR BACKGROUND ORBS
// ========================================

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.glow-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
}, { passive: true });

// ========================================
// LAZY LOADING FOR IFRAMES
// ========================================

// Already handled by loading="lazy" attribute in HTML,
// but we can enhance it with a fallback

const iframes = document.querySelectorAll('iframe[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                // Ensure iframe is loaded
                if (iframe.src && !iframe.src.includes('about:blank')) {
                    observer.unobserve(iframe);
                }
            }
        });
    });

    iframes.forEach(iframe => {
        iframeObserver.observe(iframe);
    });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ========================================
// SKIP TO MAIN CONTENT LINK (Accessibility)
// ========================================

// Add skip link functionality if needed
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const mainContent = document.querySelector('main') || document.querySelector('section:first-of-type');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ========================================
// PRINT STYLES SUPPORT
// ========================================

// Auto-expand details on print
window.addEventListener('beforeprint', () => {
    const details = document.querySelectorAll('details');
    details.forEach(detail => {
        detail.open = true;
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// ========================================
// PAGE LOAD DETECTION
// ========================================

// Add loaded class to body when page is fully loaded
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading state if any
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// ========================================
// ERROR HANDLING
// ========================================

// Handle missing images gracefully
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Image failed to load:', this.src);
        // Optionally set a placeholder or hide the broken image
    });
});

// ========================================
// LOCAL STORAGE FOR USER PREFERENCES
// ========================================

// Remember user's last visited page (optional enhancement)
function savePageVisit() {
    const currentPage = window.location.pathname;
    localStorage.setItem('lastVisitedPage', currentPage);
}

// Call on page load
savePageVisit();

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Copy to clipboard function (for contact info)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard: ' + text);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ========================================
// INITIALIZATION
// ========================================

// Run initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('SCPSC IT FEST 2026 website loaded');
    
    // Initialize all features
    setActiveNavLink();
    revealOnScroll();
    
    // Add any additional initialization here
});

// ========================================
// THEME SWITCHER
// ========================================

const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Initialize theme from localStorage or system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme = 'dark'; // default theme
    
    if (savedTheme) {
        theme = savedTheme;
    } else if (!prefersDark) {
        theme = 'light';
    }
    
    applyTheme(theme);
}

// Apply theme to document
function applyTheme(theme) {
    if (theme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = '🌙';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
        }
    } else {
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = '☀️';
            themeToggleBtn.setAttribute('title', 'Switch to Light Theme');
        }
    }
}

// Toggle theme on button click
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize theme on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// ========================================
// LOGGING (Development)
// ========================================

// Development logging (can be disabled in production)
const isDevelopment = true;

if (isDevelopment) {
    console.log('SCPSC IT FEST 2026 - Website initialized');
    console.log('Navigation:', navLinks.length, 'links found');
    console.log('Reveal elements:', revealElements.length, 'elements to animate');
    console.log('Event cards:', eventCards.length, 'cards initialized');
}
