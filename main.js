/* ============================================================
   KHURRAM SOHAIL PORTFOLIO — MAIN.JS
   ============================================================ */

/* ===== TYPING EFFECT ===== */
const typedEl   = document.getElementById('typed-text');
const words     = [
  'Aspiring Software Engineer',
  'DSA Enthusiast',
  'ML Explorer',
  'C++ & Java Developer',
  'Python Programmer',
];
let wordIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;

function type() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typedEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

document.addEventListener('DOMContentLoaded', () => setTimeout(type, 800));

/* ===== NAVBAR SCROLL + ACTIVE LINK ===== */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {

  /* shadow */
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  /* active link */
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - navbar.offsetHeight - 80) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === '#' + current
    );
  });

  /* scroll-to-top button */
  document.getElementById('scrollTop')
    .classList.toggle('visible', window.scrollY > 400);

  /* skill bars */
  animateSkillsOnScroll();
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const navList   = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => navList.classList.toggle('open'));
navLinks.forEach(l => l.addEventListener('click', () => navList.classList.remove('open')));

/* ===== SKILL BARS ===== */
let skillsAnimated = false;

function animateSkillsOnScroll() {
  if (skillsAnimated) return;
  const sec = document.getElementById('skills');
  if (!sec) return;
  if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(fill => {
      fill.style.width = fill.getAttribute('data-width') + '%';
    });
  }
}

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.textContent    = 'Sent! ✓';
    btn.style.background = '#00a8a8';
    btn.disabled       = true;
    setTimeout(() => {
      btn.textContent    = 'Submit';
      btn.style.background = '';
      btn.disabled       = false;
      form.reset();
    }, 3000);
  });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - navbar.offsetHeight,
        behavior: 'smooth'
      });
    }
  });
});

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll(
  '.journey-card, .skill-item, .project-card, .about-container, .home-content, .home-img'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

/* ===== INIT ===== */
onScroll();