/* =============================================
   COLOMBIA 5.0 — JAVASCRIPT
   ============================================= */

// Estado de idioma
let currentLang = 'es';

// =============================================
// CAMBIO DE IDIOMA
// =============================================
function toggleLanguage() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  const btn = document.getElementById('langText');
  btn.textContent = currentLang === 'es' ? 'English' : 'Español';

  // Traducir todos los elementos con data-es / data-en
  document.querySelectorAll('[data-es]').forEach(el => {
    const text = el.getAttribute('data-' + currentLang);
    if (text) {
      // Si el elemento es input o botón de filtro, cambiar textContent
      if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'SPAN' || el.tagName === 'LI') {
        el.textContent = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Traducir definiciones del glosario
  document.querySelectorAll('.glosario-def[data-es]').forEach(el => {
    el.textContent = el.getAttribute('data-' + currentLang);
  });

  // Actualizar lang del HTML
  document.documentElement.lang = currentLang;
}

// =============================================
// NAVBAR SCROLL
// =============================================
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =============================================
// MENÚ MÓVIL
// =============================================
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// =============================================
// FILTRO DE GLOSARIO
// =============================================
function filterGlosario(cat) {
  // Actualizar botones activos
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Mostrar / ocultar cards
  document.querySelectorAll('.glosario-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeInUp 0.4s ease both';
    } else {
      card.classList.add('hidden');
    }
  });
}

// =============================================
// SCROLL REVEAL
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Aplicar reveal a secciones y tarjetas
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll(
    '.stat-item, .glosario-card, .etica-card, .sobre-intro p, .objetivo-card, .conf-tema, .conf-resumen, .conf-keywords, .conf-gallery, .conf-video'
  );
  revealTargets.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});

// =============================================
// NAVEGACIÓN ACTIVA AL HACER SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    link.style.background = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#c9a8f0';
      link.style.background = 'rgba(201,168,240,0.15)';
    }
  });
});

// =============================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
