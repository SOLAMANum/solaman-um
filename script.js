/* ════════════════════════════════════════════
   SOLAMAN U M — Portfolio JavaScript
   Premium Dark Mode Interactions
════════════════════════════════════════════ */

/* ── Lucide Icons Init ── */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  initCursor();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initFAQ();
  initProjectFilter();
  initSkillBars();
  initScrollAnimations();
  initContactForm();
  initFloatingCTA();
});

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effects on interactive elements
  const interactives = document.querySelectorAll('a, button, .faq-q, .proj-card, .service-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.6)';
      ring.style.borderColor = 'rgba(26,102,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(26,102,255,0.5)';
    });
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
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
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollTop / docHeight * 100) + '%';
  }, { passive: true });
}

/* ══════════════════════════════════════
   NAVBAR (scrolled state + active links)
══════════════════════════════════════ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Active link on scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════ */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.innerHTML = isOpen
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  });
}

/* ══════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════ */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

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

      // Open clicked (toggle)
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
        const cat = card.dataset.category;
        const visible = filter === 'all' || cat === filter;
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        if (visible) {
          card.classList.remove('hidden-card');
          card.style.opacity = '1';
          card.style.transform = '';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => card.classList.add('hidden-card'), 280);
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
        const w = el.dataset.w;
        el.style.width = w + '%';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ══════════════════════════════════════
   SCROLL ANIMATIONS (fade-in-up)
══════════════════════════════════════ */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in-up');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

/* ══════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════ */
function initContactForm() {
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate submission
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.textContent = '✓ Message sent! I\'ll respond within 24 hours.';
        feedback.classList.remove('hidden');
        setTimeout(() => feedback.classList.add('hidden'), 5000);
      }
    }, 1800);
  });
}

/* ══════════════════════════════════════
   FLOATING CTA VISIBILITY
══════════════════════════════════════ */
function initFloatingCTA() {
  const cta = document.getElementById('floating-cta');
  if (!cta) return;

  window.addEventListener('scroll', () => {
    cta.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ══════════════════════════════════════
   SMOOTH INTERNAL LINK SCROLLING
══════════════════════════════════════ */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
