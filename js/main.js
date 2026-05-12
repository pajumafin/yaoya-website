/* ============================================================
   やおや みどり — main.js
============================================================ */

/* ── Fade-up on scroll ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

/* ── Hero parallax (passive, GPU only) ── */
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight) {
            heroImg.style.transform = `scale(1.08) translateY(${y * 0.2}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Mobile nav toggle ── */
const nav      = document.getElementById('mobileNav');
const menuBtn  = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeNav');

function openNav() {
  nav.style.opacity = '1';
  nav.style.pointerEvents = 'all';
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  nav.style.opacity = '0';
  nav.style.pointerEvents = 'none';
  document.body.style.overflow = '';
}

menuBtn?.addEventListener('click', openNav);
closeBtn?.addEventListener('click', closeNav);

nav?.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', closeNav);
});

/* ── Hide floating phone btn when phone CTA is visible ── */
const storeSection  = document.getElementById('store');
const floatPhone    = document.querySelector('.float-phone')?.parentElement;

if (storeSection && floatPhone) {
  const storeObserver = new IntersectionObserver(
    ([entry]) => {
      floatPhone.style.opacity = entry.isIntersecting ? '0' : '1';
      floatPhone.style.pointerEvents = entry.isIntersecting ? 'none' : 'all';
    },
    { threshold: 0.2 }
  );
  storeObserver.observe(storeSection);
}
