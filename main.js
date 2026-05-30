/* ============================================================
   KHURRAM SOHAIL PORTFOLIO — MAIN.JS (FINAL VERSION WITH AI)
   ============================================================ */

const typedEl  = document.getElementById('typed-text');
const words    = ['Aspiring Software Engineer','DSA Enthusiast','ML Explorer','C++ & Java Developer','Python Programmer'];
let wordIndex  = 0, charIndex = 0, isDeleting = false;

function type() {
  if (!typedEl) return;
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
  const navHeight = navbar ? navbar.offsetHeight : 0;
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - navHeight - 80) current = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) scrollBtn.classList.toggle('visible', window.scrollY > 400);
  animateSkillsOnScroll();
}
window.addEventListener('scroll', onScroll, { passive: true });

// Form Submission Logic
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
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
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    }).catch(() => {
      alert('Error connecting to the server.');
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  });
}

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navList   = document.querySelector('.nav-links');
if (hamburger && navList) {
  hamburger.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}
navLinks.forEach(l => l.addEventListener('click', () => {
  if (navList) navList.classList.remove('open');
  if (hamburger) {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
}));

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
    if (t) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      window.scrollTo({ top: t.offsetTop - navHeight, behavior: 'smooth' });
    }
  });
});

// Scroll Reveal
const revealEls = document.querySelectorAll('.journey-card,.skill-item,.project-card,.cert-card,.about-container,.home-content,.home-img');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      setTimeout(() => { e.target.style.transform = ''; }, 650);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

onScroll();

/* ============================================================
   AI CHATBOT LOGIC
   ============================================================ */
const aiChatToggle    = document.getElementById('aiChatToggle');
const aiChatClose     = document.getElementById('aiChatClose');
const aiChatContainer = document.getElementById('aiChatContainer');
const aiChatForm      = document.getElementById('aiChatForm');
const aiChatInput     = document.getElementById('aiChatInput');
const aiChatMessages  = document.getElementById('aiChatMessages');
const suggestBtns     = document.querySelectorAll('.ai-suggest-btn');

if (aiChatToggle && aiChatContainer) {
  aiChatToggle.addEventListener('click', () => {
    aiChatContainer.classList.toggle('open');
  });
}

if (aiChatClose && aiChatContainer) {
  aiChatClose.addEventListener('click', () => {
    aiChatContainer.classList.remove('open');
  });
}

const aiKnowledgeBase = [
  {
    keywords: ['project', 'projects', 'work', 'grocery', 'inventory'],
    response: "Khurram has built 3 key projects: <br>1. <strong>Grocery Store Manager</strong> (JavaFX, OOP, smart billing).<br>2. <strong>Inventory Track Pro</strong> (C++ High-performance application using Stacks, BST, Hash Tables).<br>3. <strong>Grocery Store Management System</strong> (C++ Console application with full File Handling CRUD features)."
  },
  {
    keywords: ['skill', 'skills', 'languages', 'code', 'coding', 'python', 'cpp', 'c++'],
    response: "Khurram's technical expertise includes: <strong>C++ (85%)</strong>, <strong>HTML/CSS (90%)</strong>, <strong>OOP (85%)</strong>, <strong>Python (80%)</strong>, <strong>Java (75%)</strong>, Data Structures (DSA), and Machine Learning."
  },
  {
    keywords: ['education', 'university', 'uet', 'taxila', 'degree', 'semester'],
    response: "Khurram is currently a Software Engineering student at <strong>UET Taxila (Session 2024 - 2028)</strong>. He is currently in his 4th semester expanding his knowledge graph."
  },
  {
    keywords: ['certificate', 'certificates', 'certified', 'coursera'],
    response: "Khurram holds 12 professional credentials including <strong>Stanford's Machine Learning</strong> (Coursera), Google's Crash Course on Python, IBM CyberSecurity, and multiple tech badges from SoloLearn."
  },
  {
    keywords: ['contact', 'email', 'phone', 'whatsapp', 'hire', 'linkedin'],
    response: "You can reach out to Khurram via the contact form on this website or directly via email. Connect with him on his <a href='https://www.linkedin.com/in/khurram-sohail-34046832a/' target='_blank' style='color:#21e6e6; text-decoration:underline;'>LinkedIn profile</a>!"
  },
  {
    keywords: ['about', 'who are you', 'khurram', 'sohail'],
    response: "Khurram Sohail is a Software Engineering student, Microsoft Learn Student Ambassador (MLSA), and active contributor at SoftDesk, GDSC, and YPDC."
  }
];

function getBotResponse(input) {
  const cleanInput = input.toLowerCase().trim();
  for (const item of aiKnowledgeBase) {
    if (item.keywords.some(keyword => cleanInput.includes(keyword))) {
      return item.response;
    }
  }
  return "Interesting question! I am customized to answer about Khurram's projects, skills, certifications, and academic background. Try asking about his 'Projects' or 'Skills'!";
}

function appendMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('ai-message', sender);
  msgDiv.innerHTML = text;
  aiChatMessages.appendChild(msgDiv);
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}

if (aiChatForm) {
  aiChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = aiChatInput.value;
    if (!query.trim()) return;
    
    appendMessage(query, 'user');
    aiChatInput.value = '';
    
    setTimeout(() => {
      const reply = getBotResponse(query);
      appendMessage(reply, 'bot');
    }, 450);
  });
}

suggestBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.textContent;
    appendMessage(text, 'user');
    setTimeout(() => {
      appendMessage(getBotResponse(text), 'bot');
    }, 400);
  });
});
