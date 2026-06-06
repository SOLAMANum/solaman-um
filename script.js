document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    /* ==========================================================================
       Custom Cursor
       ========================================================================== */
    const cursorDot  = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top  = mouseY + 'px';
    });

    // Smooth ring follow
    function animateCursor() {
        ringX += (mouseX - ringX) * 0.14;
        ringY += (mouseY - ringY) * 0.14;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top  = ringY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Expand ring on hoverable elements
    document.querySelectorAll('a, button, .tech-icon, .project-card, .cert-card, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });

    /* ==========================================================================
       Scroll Progress Bar
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop    = window.scrollY;
        const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
        const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = pct + '%';
    }, { passive: true });

    /* ==========================================================================
       Typewriter Effect
       ========================================================================== */
    const typewriterEl = document.getElementById('typewriter');
    const words = [
        'React Interfaces',
        'Data Dashboards',
        'ML Pipelines',
        'REST APIs',
        'Cloud Apps',
        'Full-Stack Products',
    ];
    let wordIdx  = 0;
    let charIdx  = 0;
    let deleting = false;
    const typeDelay   = 80;
    const deleteDelay = 45;
    const pauseDelay  = 1800;

    function typeLoop() {
        const current = words[wordIdx];
        if (!deleting) {
            typewriterEl.textContent = current.slice(0, ++charIdx);
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(typeLoop, pauseDelay);
                return;
            }
        } else {
            typewriterEl.textContent = current.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                wordIdx  = (wordIdx + 1) % words.length;
            }
        }
        setTimeout(typeLoop, deleting ? deleteDelay : typeDelay);
    }
    typeLoop();

    /* ==========================================================================
       Floating Hire Button — show after scrolling past hero
       ========================================================================== */
    const floatingHire = document.getElementById('floating-hire');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            floatingHire.classList.add('visible');
        } else {
            floatingHire.classList.remove('visible');
        }
    }, { passive: true });

    /* ==========================================================================
       Dark / Light Theme Toggle
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    const moonIcon = themeToggleBtn.querySelector('.moon-icon');
    const body = document.body;

    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        enableLightTheme();
    } else {
        enableDarkTheme();
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            enableDarkTheme();
            localStorage.setItem('theme', 'dark');
        } else {
            enableLightTheme();
            localStorage.setItem('theme', 'light');
        }
    });

    function enableLightTheme() {
        body.classList.add('light-mode');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }

    function enableDarkTheme() {
        body.classList.remove('light-mode');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }

    /* ==========================================================================
       Mobile Navigation Menu
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = mobileToggle.querySelector('.menu-icon');
    const closeIcon = mobileToggle.querySelector('.close-icon');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        
        if (isOpen) {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            body.style.overflow = 'hidden'; // Lock body scroll when menu open
        } else {
            closeMenu();
        }
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    function closeMenu() {
        navMenu.classList.remove('open');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        body.style.overflow = ''; // Restore scroll
    }

    /* ==========================================================================
       Navbar Scroll Handling
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       Active Navigation Highlight on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight when 1/3 of the section is visible in view
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Scroll Animations (Intersection Observer)
       ========================================================================== */
    const animElements = document.querySelectorAll('.fade-in-up');
    
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animElements.forEach(el => elementObserver.observe(el));

    /* ==========================================================================
       Dynamic Skill Progress Bar Fill
       ========================================================================== */
    const skillsSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.progress-fill');

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressFills.forEach(fill => {
                    const percent = fill.getAttribute('data-percent');
                    fill.style.width = percent;
                });
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, {
        threshold: 0.2
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    /* ==========================================================================
       Project Filtering Logic
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active class on clicked button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add tiny fade out transition before toggling displays
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('filter-hide');
                        // Tiny timeout to let display recalculate, then fade back in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('filter-hide');
                    }
                }, 300);
            });
        });
    });

    /* ==========================================================================
       Contact Form Handling (Recruiter Feedback)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable button and show loading state
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Sending...</span><div class="spinner"></div>`;

            // Style spinner in script briefly
            const spinnerStyle = document.createElement('style');
            spinnerStyle.id = 'spinner-style';
            spinnerStyle.innerHTML = `
                .spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 0.8s linear infinite;
                    display: inline-block;
                    margin-left: 8px;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinnerStyle);

            // Simulate form submission (AJAX post)
            setTimeout(() => {
                // Success feedback
                formFeedback.classList.remove('hidden', 'error');
                formFeedback.classList.add('success');
                formFeedback.textContent = "Thank you! Your message has been sent successfully. Solaman will get back to you shortly.";
                
                // Reset form inputs
                contactForm.reset();

                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Remove temporary spinner styling
                const tempStyle = document.getElementById('spinner-style');
                if (tempStyle) tempStyle.remove();

                // Auto hide feedback banner after 6 seconds
                setTimeout(() => {
                    formFeedback.classList.add('hidden');
                }, 6000);

            }, 1800);
        });
    }
});
