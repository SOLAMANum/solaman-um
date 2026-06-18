/* ════════════════════════════════════════════
   SOLAMAN U M — Portfolio v2 JavaScript
   Premium Dark Portfolio Interactions
════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  initCursor();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initFAQ();
  initProjectFilter();
  initSkillBars();
  initContactForm();
  initFloatingCTA();
  initSmoothScroll();
  initTypewriter();
});

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Scale up on interactive elements
  const interactives = document.querySelectorAll('a, button, .faq-q, .proj-card, .tool-tag, .filter-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform  = 'translate(-50%,-50%) scale(1.7)';
      ring.style.borderColor = 'rgba(212,168,67,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(212,168,67,0.45)';
    });
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}

/* ══════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight * 100) : 0;
    bar.style.width  = Math.min(progress, 100) + '%';
  }, { passive: true });
}

/* ══════════════════════════════════════
   NAVBAR — scrolled state + active link tracking
══════════════════════════════════════ */
function initNavbar() {
  const nav   = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  if (!nav) return;

  // Scrolled class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Active section tracking via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════ */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const openIcon  = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen ? openIcon : closeIcon;
  });

  // Close on link/button click within menu
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = closeIcon;
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    const navbar = document.getElementById('navbar');
    if (!navbar?.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = closeIcon;
    }
  });
}

/* ══════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
══════════════════════════════════════ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Stagger children within the same parent
  const staggerGroups = document.querySelectorAll('.testimonials-grid, .projects-grid, .skills-grid, .about-card-grid, .achievements-strip');
  staggerGroups.forEach(group => {
    const children = group.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px'
  });

  elements.forEach(el => {
    // Immediately reveal elements already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });

  // Safety fallback: reveal all after 1.5s in case observer doesn't fire
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      el.classList.add('visible');
    });
  }, 1500);
}

/* ══════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════ */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle opened
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ══════════════════════════════════════
   PROJECT FILTER
══════════════════════════════════════ */
function initProjectFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proj-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat     = card.dataset.category;
        const visible = filter === 'all' || cat === filter;

        if (visible) {
          card.classList.remove('hidden-card');
          requestAnimationFrame(() => {
            card.style.opacity   = '1';
            card.style.transform = '';
          });
        } else {
          card.style.opacity   = '0';
          card.style.transform = 'scale(0.96) translateY(8px)';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.classList.add('hidden-card');
            }
          }, 260);
        }
      });
    });
  });
}

/* ══════════════════════════════════════
   SKILL BARS ANIMATION
══════════════════════════════════════ */
function initSkillBars() {
  const bars = document.querySelectorAll('.sbar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const w  = el.dataset.w || '0';
        // Small delay for stagger effect
        setTimeout(() => { el.style.width = w + '%'; }, 120);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  bars.forEach(bar => observer.observe(bar));
}

/* ══════════════════════════════════════
   CONTACT FORM (Web3Forms)
══════════════════════════════════════ */
function initContactForm() {
  const form      = document.getElementById('contact-form');
  const feedback  = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');
  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalHTML   = submitBtn.innerHTML;
    submitBtn.innerHTML  = '<span>Sending…</span>';
    submitBtn.disabled   = true;

    if (feedback) {
      feedback.classList.add('hidden');
      feedback.className = 'form-feedback hidden';
    }

    try {
      const formData = new FormData(form);
      const object   = Object.fromEntries(formData.entries());
      const json     = JSON.stringify(object);

      const res      = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    json,
      });
      const data = await res.json();

      if (res.ok && data.success) {
        form.reset();
        showFeedback(feedback, 'success', '✓ Message sent! I\'ll respond within 24 hours.');
      } else {
        showFeedback(feedback, 'error', data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      showFeedback(feedback, 'error', 'Network error. Please email me directly at solamanum@gmail.com');
    } finally {
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled  = false;
      if (window.lucide) lucide.createIcons();
    }
  });

  function showFeedback(el, type, message) {
    if (!el) return;
    el.className = `form-feedback ${type}`;
    el.textContent = message;
    setTimeout(() => el.classList.add('hidden'), 7000);
  }
}

/* ══════════════════════════════════════
   FLOATING CTA
══════════════════════════════════════ */
function initFloatingCTA() {
  const cta = document.getElementById('floating-cta');
  if (!cta) return;

  window.addEventListener('scroll', () => {
    cta.classList.toggle('visible', window.scrollY > 450);
  }, { passive: true });
}

/* ══════════════════════════════════════
   SMOOTH SCROLL for anchor links
══════════════════════════════════════ */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id     = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const navH   = document.getElementById('navbar')?.offsetHeight || 72;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH - 4;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════
   TYPEWRITER EFFECT FOR HERO HEADING
   ══════════════════════════════════════ */
function initTypewriter() {
  const wordEl = document.getElementById('typewriter-word');
  if (!wordEl) return;

  const words = ['Exceptional', 'Production-Ready', 'Data-Driven', 'Cloud-Scale', 'Pixel-Perfect'];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
      wordEl.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      wordEl.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIdx === currentWord.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}


