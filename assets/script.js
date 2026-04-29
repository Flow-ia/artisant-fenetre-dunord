// ===== Mobile menu =====
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== Scroll reveal =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.animationDelay = `${(i % 6) * 80}ms`;
  observer.observe(el);
});

// ===== Sticky nav shadow =====
const nav = document.querySelector('.nav');
if (nav) {
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 20) nav.style.boxShadow = '0 8px 24px -16px rgba(10,22,40,0.18)';
    else nav.style.boxShadow = 'none';
    last = y;
  }, { passive: true });
}

// ===== Counter animation =====
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// ===== Contact form (mailto fallback + WhatsApp) =====
const form = document.querySelector('#contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name') || '';
    const email = fd.get('email') || '';
    const phone = fd.get('phone') || '';
    const project = fd.get('project') || '';
    const material = fd.get('material') || '';
    const message = fd.get('message') || '';

    const subject = `Demande de devis — ${project || 'Projet'}`;
    const body = `Bonjour,
%0D%0A%0D%0AJe souhaite obtenir un devis.
%0D%0A%0D%0ANom : ${name}
%0D%0AEmail : ${email}
%0D%0ATéléphone : ${phone}
%0D%0AType de projet : ${project}
%0D%0AMatériau souhaité : ${material}
%0D%0A%0D%0AMessage :
%0D%0A${message}
%0D%0A%0D%0ACordialement.`;

    window.location.href = `mailto:Artisantfenetrenord@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    const successBox = document.querySelector('#formSuccess');
    if (successBox) {
      successBox.style.display = 'flex';
      setTimeout(() => { successBox.style.display = 'none'; }, 6000);
    }
  });
}

// ===== WhatsApp pre-fill =====
document.querySelectorAll('[data-whatsapp]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = btn.dataset.whatsapp || 'Bonjour, je souhaite un devis pour mes fenêtres.';
    const phone = '33658978288';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  });
});

// ===== Marquee pause on hover =====
document.querySelectorAll('.marquee').forEach(m => {
  m.addEventListener('mouseenter', () => m.style.animationPlayState = 'paused');
  m.addEventListener('mouseleave', () => m.style.animationPlayState = 'running');
});

// ===== Before/After slider =====
document.querySelectorAll('.ba-slider').forEach(slider => {
  const range = slider.querySelector('input[type="range"]');
  const after = slider.querySelector('.ba-after');
  const handle = slider.querySelector('.ba-handle');
  function update(v) {
    after.style.clipPath = `inset(0 ${100-v}% 0 0)`;
    handle.style.left = `${v}%`;
  }
  range.addEventListener('input', e => update(e.target.value));
  update(50);
});
