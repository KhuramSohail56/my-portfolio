/* ============================================================
   KHURRAM SOHAIL PORTFOLIO — MAIN.JS (FINAL VERSION)
   ============================================================ */

const typedEl  = document.getElementById('typed-text');
const words    = ['Aspiring Software Engineer','DSA Enthusiast','ML Explorer','C++ & Java Developer','Python Programmer'];
let wordIndex  = 0, charIndex = 0, isDeleting = false;

function type() {
  const w = words[wordIndex];
  typedEl.textContent = isDeleting ? w.slice(0, charIndex - 1) : w.slice(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;
  if (!isDeleting && charIndex === w.length) { isDeleting = true; setTimeout(type, 1800); return; }
  if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
  setTimeout(type, isDeleting ? 60 : 100);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 800));

const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - navbar.offsetHeight - 80) current = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) scrollBtn.classList.toggle('visible', window.scrollY > 400);
  animateSkillsOnScroll();
}
window.addEventListener('scroll', onScroll, { passive: true });

// Form Submission Logic - Direct Redirect to ThankYou Page
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    fetch(this.action, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        window.location.href = 'thankyou.html';
      } else {
        alert('Submission failed. Please try again.');
        btn.textContent = originalText;
        btn.disabled = false;
      }
    }).catch(() => {
      alert('Error connecting to the server.');
      btn.textContent = originalText;
      btn.disabled = false;
    });
  });
}

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navList   = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navList.classList.toggle('open'));
}
navLinks.forEach(l => l.addEventListener('click', () => navList.classList.remove('open')));

// Skills Animation
let skillsAnimated = false;
function animateSkillsOnScroll() {
  if (skillsAnimated) return;
  const sec = document.getElementById('skills');
  if (sec && sec.getBoundingClientRect().top < window.innerHeight - 100) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(f => f.style.width = f.getAttribute('data-width') + '%');
  }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const t = document.querySelector(id);
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - navbar.offsetHeight, behavior: 'smooth' }); }
  });
});

// Scroll Reveal
const revealEls = document.querySelectorAll('.journey-card,.skill-item,.project-card,.cert-card,.about-container,.home-content,.home-img');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

onScroll();
