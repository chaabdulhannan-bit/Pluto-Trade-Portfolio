/* =============================================
   PLUTO TRADE PORTFOLIO — main.js
   ============================================= */

/* ── SMOOTH SCROLL for nav links ─────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── ACTIVE NAV HIGHLIGHT on scroll ─────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

/* ── CONTACT FORM — basic validation & submit ── */
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    /* 
      Replace this block with your actual form submission logic.
      Options:
        - Formspree:  fetch('https://formspree.io/f/YOUR_ID', { method:'POST', ... })
        - EmailJS:    emailjs.send('SERVICE_ID', 'TEMPLATE_ID', { name, email, service, message })
        - Custom API: fetch('/api/contact', { method:'POST', body: JSON.stringify({...}) })
    */
    console.log('Form submitted:', { name, email, service, message });
    alert(`Thanks ${name}! Your message has been sent. I'll reply within 24 hours.`);

    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('message').value = '';
  });
}

/* ── SCROLL REVEAL animation ─────────────────── */
const revealElements = document.querySelectorAll(
  '.service-card, .portfolio-card, .testi-card, .about-card'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

/* ── LOAD DATA from data.json (optional) ─────── */
/* Uncomment below if you want to dynamically populate
   the page from data.json instead of hardcoded HTML.

fetch('data.json')
  .then(r => r.json())
  .then(data => {
    document.title = data.site.name;
    // map data.services, data.portfolio, data.testimonials
    // into the DOM as needed
  })
  .catch(err => console.error('Could not load data.json', err));
*/
