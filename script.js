/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observerNav.observe(s));

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll(
  '.section-header, .about-visual, .about-text, .skill-category, .project-card, .contact-info, .contact-form, .highlight-item'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ===== SKILL BARS ===== */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      entry.target.style.width = width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObserver.observe(el));

/* ===== FOOTER YEAR ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== CONTACT FORM ===== */
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const btn    = document.getElementById('submit-btn');

const nameInput    = document.getElementById('name');
const emailInput   = document.getElementById('email');
const messageInput = document.getElementById('message');

// Real-time validation helper
function showError(fieldId, errorMessage) {
  const inputEl = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + '-error');
  inputEl.classList.add('input-error');
  errorEl.textContent = errorMessage;
  errorEl.style.display = 'block';
}

function clearError(fieldId) {
  const inputEl = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + '-error');
  inputEl.classList.remove('input-error');
  errorEl.textContent = '';
  errorEl.style.display = 'none';
}

function validateName() {
  const name = nameInput.value.trim();
  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  if (!name) {
    showError('name', 'Name is required.');
    return false;
  } else if (!nameRegex.test(name)) {
    showError('name', 'Name must be at least 3 characters (letters only).');
    return false;
  }
  clearError('name');
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    showError('email', 'Email is required.');
    return false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address.');
    return false;
  }
  clearError('email');
  return true;
}

function validateMessage() {
  const message = messageInput.value.trim();
  if (!message) {
    showError('message', 'Message is required.');
    return false;
  } else if (message.length < 15) {
    showError('message', 'Message must be at least 15 characters.');
    return false;
  }
  clearError('message');
  return true;
}

// Add event listeners for real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    status.textContent = '';
    status.className   = 'form-status';
    return;
  }

  // Submit via Web3Forms
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Sending…';
  status.textContent = '';
  status.className   = 'form-status';

  const formData = new FormData(form);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    const data = await response.json();

    if (data.success) {
      status.textContent = '✅ Message sent! I\'ll get back to you soon.';
      status.className   = 'form-status success';
      form.reset();
    } else {
      status.textContent = '❌ Something went wrong. Please try again.';
      status.className   = 'form-status error';
      console.log('Error', data);
    }
  } catch (error) {
    status.textContent = '❌ Network error. Please try again.';
    status.className   = 'form-status error';
    console.log('Error', error);
  } finally {
    btn.disabled = false;
    btn.querySelector('.btn-text').textContent = 'Send Message';
    setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
  }
});

/* ===== HERO TITLE TYPING EFFECT ===== */
const taglines = ['Software Engineer', 'Backend Developer', 'AI Enthusiast', 'Full-Stack Builder'];
let tIdx = 0, cIdx = 0, deleting = false;
const typingEl = document.querySelector('.hero-title span.gradient-text')?.nextSibling;

// Only run the subtitle cycling effect on the subtitle paragraph
const subtitleEl = document.querySelector('.hero-subtitle');
const subtitles = [
  'I build scalable, clean, and performant web applications — from intuitive frontends to robust backend systems.',
  'Passionate about Python, FastAPI, and building AI-powered applications that make a real difference.',
  'Turning ideas into working software — one commit at a time.'
];
let sIdx = 0;
setInterval(() => {
  sIdx = (sIdx + 1) % subtitles.length;
  subtitleEl.style.opacity = '0';
  setTimeout(() => {
    subtitleEl.textContent = subtitles[sIdx];
    subtitleEl.style.opacity = '1';
  }, 400);
}, 4000);
subtitleEl.style.transition = 'opacity 0.4s ease';

/* ===== PROJECT CARD TILT ===== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `translateY(-6px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});
