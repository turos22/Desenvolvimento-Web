/* ==========================================
   faq.js — Página de Perguntas Frequentes
   ========================================== */

const faqSearch   = document.getElementById('faqSearch');
const faqSections = document.getElementById('faqSections');
const faqEmpty    = document.getElementById('faqEmpty');
const faqCta      = document.getElementById('faqCta');
const catButtons  = document.querySelectorAll('.faq-cat');

let activeCategory = 'all';

/* ------------------------------------------
   Accordion — abrir / fechar respostas
   ------------------------------------------ */
faqSections.addEventListener('click', e => {
  const btn = e.target.closest('.faq-question');
  if (!btn) return;

  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  const answer = btn.nextElementSibling;

  /* Fecha todos os outros abertos na mesma seção */
  const section = btn.closest('.faq-section');
  section.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(q => {
    if (q !== btn) {
      q.setAttribute('aria-expanded', 'false');
      q.nextElementSibling.hidden = true;
    }
  });

  btn.setAttribute('aria-expanded', String(!isOpen));
  answer.hidden = isOpen;
});

/* ------------------------------------------
   Filtro por categoria
   ------------------------------------------ */
catButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    catButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    activeCategory = btn.dataset.cat;
    applyFilters();
  });
});

/* ------------------------------------------
   Busca em tempo real
   ------------------------------------------ */
faqSearch.addEventListener('input', applyFilters);

/* ------------------------------------------
   Aplicar filtros (categoria + busca)
   ------------------------------------------ */
function applyFilters() {
  const query = faqSearch.value.trim().toLowerCase();
  const sections = document.querySelectorAll('.faq-section');
  let totalVisible = 0;

  sections.forEach(section => {
    const cat = section.dataset.category;

    /* Filtro de categoria */
    const catMatch = activeCategory === 'all' || cat === activeCategory;
    if (!catMatch) {
      section.hidden = true;
      return;
    }

    /* Filtro de busca dentro da seção */
    const items = section.querySelectorAll('.faq-item');
    let visibleInSection = 0;

    items.forEach(item => {
      const qText = item.querySelector('.faq-question span').textContent.toLowerCase();
      const aText = item.querySelector('.faq-answer p')?.textContent.toLowerCase() ?? '';
      const match = !query || qText.includes(query) || aText.includes(query);

      item.hidden = !match;
      if (match) visibleInSection++;
    });

    section.hidden = visibleInSection === 0;
    if (visibleInSection > 0) totalVisible += visibleInSection;
  });

  faqEmpty.hidden = totalVisible > 0;
  faqCta.hidden   = totalVisible === 0;
}

/* ------------------------------------------
   Inicialização
   ------------------------------------------ */
applyFilters();
