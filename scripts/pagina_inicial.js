/* ==========================================
   Incluir+ — script.js
   ========================================== */

const navbar    = document.querySelector('.custom-navbar');
const navToggle = document.querySelector('.custom-nav-toggle');
const navMobile = document.querySelector('.custom-nav-mobile');

/* ------------------------------------------
   Navbar: sombra ao rolar
   ------------------------------------------ */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
}, { passive: true });

/* ------------------------------------------
   Menu mobile: abrir / fechar
   ------------------------------------------ */
navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.querySelector('i').className = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars';
  navMobile.setAttribute('aria-hidden', !isOpen);
});

/* Fechar ao clicar num link do menu mobile */
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

function closeMobileMenu() {
  navMobile.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.querySelector('i').className = 'fa-solid fa-bars';
  navMobile.setAttribute('aria-hidden', 'true');
}

/* Fechar ao clicar fora do menu */
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) closeMobileMenu();
});

/* ------------------------------------------
   Link ativo conforme seção visível
   ------------------------------------------ */
const sections     = document.querySelectorAll('main section[id]');
const desktopLinks = document.querySelectorAll('.custom-nav-links a');

function updateActiveLink() {
  let currentId = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      currentId = section.id;
    }
  });

  desktopLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${currentId}`);
  });
}

/* Rodar uma vez no carregamento */
updateActiveLink();
