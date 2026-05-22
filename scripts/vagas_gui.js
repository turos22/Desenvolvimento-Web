/* ==========================================
   vagas.js — Filtros, busca, ordenação e paginação
   ========================================== */

const ITEMS_PER_PAGE = 3;

/* ------------------------------------------
   Renderizar vagas
   ------------------------------------------ */


function renderizarVagas(listaVagas, mostrarInativas = false) {
    const container = document.getElementById("jobsList");
    if (!container) return;
      container.innerHTML = "";

    // FILTRAR SE PRECISA MOSTRAR SÓ ATIVAS
    const vagasFiltradas = mostrarInativas 
        ? listaVagas 
        : listaVagas.filter(v => v.status == "ativa");

    vagasFiltradas.forEach(v => {
        const defV = v.deficiencia.split(" ");
        const dataAtual = new Date();
        const dataV = new Date(v.data);
        const dias = Math.floor((dataAtual - dataV) / (1000 * 60 * 60 * 24));
        container.innerHTML += `
        <li class="job-item"
          data-deficiencia="${v.deficiencia}"
          data-modalidade="${v.modalidade}"
          data-contrato="${v.contrato}"
          data-salario-min="${v.salario_minimo}"
          data-tempo="${dias}">
          <div class="job-item-header">
            <div>
              <h3 class="job-item-title">${v.titulo}</h3>
              <p class="job-item-company">
                <i class="fa-regular fa-building" aria-hidden="true"></i> ${v.empresa}
              </p>
            </div>
            <div class="job-item-icon" aria-hidden="true">
              <i class="fa-solid fa-briefcase"></i>
            </div>
          </div>
          <p class="job-item-desc">
            ${v.descricao}
          </p>
          <div class="job-item-meta">
            ${v.modalidade !== 'home' ? `
                <span>
                  <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                  ${v.endereco.cidade}, ${v.endereco.estado}
                </span>
              ` : ''}
            <span><i class="fa-regular fa-clock" aria-hidden="true"></i> Há ${dias} dias</span>
          </div>
          <div class="job-item-tags">
            <span class="tag tag-clt">${formatarContrato(v.contrato)}</span>
            <span class="tag tag-mode">${formatarModalidade(v.modalidade)}</span>
            ${defV.map(d => `<span class="tag tag-disability">${formatarDeficiencia(d)}</span>`).join('')}
          </div>
          <div class="job-item-footer">
            <span class="job-item-salary"> R$ ${v.salario_minimo} – R$ ${v.salario_maximo}</span>
            <button class="btn btn-primary btn-sm btn-detalhes" onclick="abrirDetalhesVaga(${v.id})">
              Ver Detalhes
            </button>
          </div>
        </li>
        `;
    });
}

function renderizarVagasIndex(listaVagas, mostrarInativas = false) {
    const container = document.getElementById("jobs-grid");
    if (!container) return;
      container.innerHTML = "";

    // FILTRAR SE PRECISA MOSTRAR SÓ ATIVAS
    const vagasFiltradas = (
        mostrarInativas
          ? listaVagas
          : listaVagas.filter(v => v.status == "ativa")
    ).slice(0, 4);

    vagasFiltradas.forEach(v => {
        const defV = v.deficiencia.split(" ");
        const dataAtual = new Date();
        const dataV = new Date(v.data);
        const dias = Math.floor((dataAtual - dataV) / (1000 * 60 * 60 * 24));
        container.innerHTML += `
          <article class="job-card" 
          data-deficiencia="${v.deficiencia}"
          data-modalidade="${v.modalidade}"
          data-contrato="${v.contrato}"
          data-salario-min="${v.salario_minimo}"
          data-tempo="${dias}">
            <div class="job-card-header">
              <div>
                <h3 class="job-title">${v.titulo}</h3>
                <p class="job-company">
                  <i class="fa-regular fa-building" aria-hidden="true"></i> ${v.empresa}
                </p>
              </div>
              <div class="job-icon" aria-hidden="true">
                <i class="fa-solid fa-briefcase"></i>
              </div>
            </div>
            <div class="job-meta">
              ${v.modalidade !== 'home' ? `
                <span>
                  <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                  ${v.endereco.cidade}, ${v.endereco.estado}
                </span>
              ` : ''}
              <span><i class="fa-regular fa-clock" aria-hidden="true"></i> Há ${dias} dias</span>
            </div>
            <div class="job-tags">
              <span class="tag tag-clt">${formatarContrato(v.contrato)}</span>
              <span class="tag tag-mode">${formatarModalidade(v.modalidade)}</span>
            </div>
            <div class="job-disabilities">
              ${defV.map(d => `<span class="tag tag-disability">${formatarDeficiencia(d)}</span>`).join('')}
            </div>
            <div class="job-footer">
              <span class="job-salary">R$ ${v.salario_minimo} – R$ ${v.salario_maximo}</span>
              <button class="btn btn-primary btn-sm btn-detalhes" onclick="abrirDetalhesVaga(${v.id})">
                Ver Detalhes
              </button>
            </div>
          </article>`;
    });
}

function abrirDetalhesVaga(id) {

  const vaga =
    vagas.find(v => v.id == id);

  if (!vaga) return;

  document.getElementById('detalhesTitulo')
    .textContent = vaga.titulo;

  document.getElementById('detalhesEmpresa')
    .textContent = vaga.empresa;

  document.getElementById('detalhesDescricao')
    .textContent = vaga.descricao || '-';

  document.getElementById('detalhesModalidade')
    .textContent = formatarModalidade(vaga.modalidade);

  document.getElementById('detalhesContrato')
    .textContent = formatarContrato(vaga.contrato);

  document.getElementById('detalhesEscolaridade')
    .textContent = formatarEscolaridade(vaga.escolaridade);

  document.getElementById('detalhesSalario')
    .textContent =
      `R$ ${vaga.salario_minimo} - R$ ${vaga.salario_maximo}`;

  // ENDEREÇO
  const blocoEndereco =
    document.getElementById('blocoEndereco');

  if (vaga.modalidade === 'home') {

    blocoEndereco.style.display = 'none';

  } else {

    blocoEndereco.style.display = '';

    document.getElementById('detalhesEndereco')
      .textContent =
      `${vaga.endereco.rua}, ${vaga.endereco.numero}
       ${vaga.endereco.bairro}
       ${vaga.endereco.cidade} - ${vaga.endereco.estado}
          CEP: ${vaga.endereco.cep}`;
            }

  document.getElementById('detalhesBeneficios')
    .textContent = vaga.beneficios || '-';

  document.getElementById('detalhesRequisitos')
    .textContent = vaga.requisitos || '-';

  document.getElementById('detalhesReqOpc')
    .textContent =
      vaga.requisitos_opcionais || '-';

  document.getElementById('detalhesResponsabilidades')
    .textContent =
      vaga.responsabilidades || '-';

  document.getElementById('detalhesDeficiencia')
    .textContent =
      vaga.deficiencia || '-';

  document.getElementById('modalDetalhesOverlay')
    .classList.add('active');
}

function fecharModalDetalhes() {

  document.getElementById('modalDetalhesOverlay')
    .classList.remove('active');
}



function formatarModalidade(mod) {
    switch(mod) {
        case "home": return "Home Office";
        case "hibrido": return "Híbrido";
        case "presencial": return "Presencial";
        default: return mod;
    }
}

function formatarContrato(mod) {
    switch(mod) {
        case "clt": return "CLT";
        case "pj": return "PJ";
        case "estagio": return "Estágio";
        default: return mod;
    }
}

function formatarDeficiencia(mod) {
    switch(mod) {
        case "fisica": return "Deficiência Física";
        case "auditiva": return "Deficiência Auditiva";
        case "visual": return "Deficiência Visual";
        case "intelectual": return "Deficiência Intelectual";
        default: return mod;
    }
}

function formatarEscolaridade(mod) {
    switch(mod) {
        case "medio": return "Ensino Médio";
        case "graduacao": return "Graduação";
        case "pos": return "Pós-Graduação";
        default: return mod;
    }
}

renderizarVagas(vagas, false);
renderizarVagasIndex(vagas, false);

const allItems      = Array.from(document.querySelectorAll('.job-item'));
const jobsCount     = document.getElementById('jobsCount');
const jobsEmpty     = document.getElementById('jobsEmpty');
const jobsList      = document.getElementById('jobsList');
const clearBtn      = document.getElementById('clearFilters');
const sortSelect    = document.getElementById('sortSelect');
const searchForm    = document.getElementById('searchForm');
const searchQuery   = document.getElementById('searchQuery');
const searchLoc     = document.getElementById('searchLocation');
const filtersToggle = document.getElementById('filtersToggle');
const filtersSidebar = document.getElementById('filtersSidebar');

/* ------------------------------------------
   Toggle de filtros no mobile
   ------------------------------------------ */
if (filtersToggle && filtersSidebar) {
  filtersToggle.addEventListener('click', () => {
    const isOpen = filtersSidebar.classList.toggle('open');
    filtersToggle.setAttribute('aria-expanded', isOpen);
  });
}
const pagePrev     = document.getElementById('pagePrev');
const pageNext     = document.getElementById('pageNext');
const pageNumbers  = document.getElementById('pageNumbers');

let currentPage    = 1;
let visibleItems   = [...allItems];

/* ------------------------------------------
   Estado da busca e filtros
   ------------------------------------------ */
let state = {
  query:       '',
  location:    '',
  deficiencia: [],
  modalidade:  [],
  contrato:    [],
  sort:        'recentes',
};

/* ------------------------------------------
   Filtros por checkbox
   ------------------------------------------ */
document.querySelectorAll('.filter-option input').forEach(cb => {
  cb.addEventListener('change', () => {
    const group = cb.name; // deficiencia | modalidade | contrato
    if (cb.checked) {
      state[group].push(cb.value);
    } else {
      state[group] = state[group].filter(v => v !== cb.value);
    }
    currentPage = 1;
    apply();
  });
});

/* ------------------------------------------
   Ordenação
   ------------------------------------------ */
sortSelect.addEventListener('change', () => {
  state.sort = sortSelect.value;
  currentPage = 1;
  apply();
});

/* ------------------------------------------
   Busca
   ------------------------------------------ */
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  state.query    = searchQuery.value.trim().toLowerCase();
  state.location = searchLoc.value.trim().toLowerCase();
  currentPage = 1;
  apply();
});

/* Busca em tempo real */
searchQuery.addEventListener('input', () => {
  state.query = searchQuery.value.trim().toLowerCase();
  currentPage = 1;
  apply();
});

searchLoc.addEventListener('input', () => {
  state.location = searchLoc.value.trim().toLowerCase();
  currentPage = 1;
  apply();
});

/* ------------------------------------------
   Limpar filtros
   ------------------------------------------ */
clearBtn.addEventListener('click', () => {
  document.querySelectorAll('.filter-option input').forEach(cb => {
    cb.checked = false;
  });
  state.deficiencia = [];
  state.modalidade  = [];
  state.contrato    = [];
  state.query       = '';
  state.location    = '';
  searchQuery.value = '';
  searchLoc.value   = '';
  sortSelect.value  = 'recentes';
  state.sort        = 'recentes';
  currentPage       = 1;
  apply();
});

/* ------------------------------------------
   Paginação
   ------------------------------------------ */
pagePrev.addEventListener('click', () => {
  if (currentPage > 1) { currentPage--; render(); }
});

pageNext.addEventListener('click', () => {
  const total = Math.ceil(visibleItems.length / ITEMS_PER_PAGE);
  if (currentPage < total) { currentPage++; render(); }
});

/* ------------------------------------------
   Lógica principal
   ------------------------------------------ */
function apply() {
  /* 1. Filtrar */
  visibleItems = allItems.filter(item => {
    const defData  = item.dataset.deficiencia || '';
    const modData  = item.dataset.modalidade  || '';
    const ctData   = item.dataset.contrato    || '';
    const titleEl  = item.querySelector('.job-item-title');
    const compEl   = item.querySelector('.job-item-company');
    const descEl   = item.querySelector('.job-item-desc');
    const metaEl   = item.querySelector('.job-item-meta');

    const text = [
      titleEl?.textContent,
      compEl?.textContent,
      descEl?.textContent,
      metaEl?.textContent,
    ].join(' ').toLowerCase();

    /* Busca por texto */
    if (state.query && !text.includes(state.query)) return false;

    /* Busca por localização */
    if (state.location && !text.includes(state.location)) return false;

    /* Filtro deficiência */
    if (state.deficiencia.length) {
      const match = state.deficiencia.some(v => defData.includes(v));
      if (!match) return false;
    }

    /* Filtro modalidade */
    if (state.modalidade.length) {
      const match = state.modalidade.some(v => modData.includes(v));
      if (!match) return false;
    }

    /* Filtro contrato */
    if (state.contrato.length) {
      const match = state.contrato.some(v => ctData.includes(v));
      if (!match) return false;
    }

    return true;
  });

  /* 2. Ordenar */
  visibleItems = [...visibleItems].sort((a, b) => {
    if (state.sort === 'recentes') {
      return Number(a.dataset.tempo) - Number(b.dataset.tempo);
    }
    const salA = Number(a.dataset.salarioMin);
    const salB = Number(b.dataset.salarioMin);
    return state.sort === 'salario-asc' ? salA - salB : salB - salA;
  });

  render();
}

function render() {
  const total      = visibleItems.length;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  currentPage = Math.min(currentPage, totalPages);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end   = start + ITEMS_PER_PAGE;
  const pageItems = visibleItems.slice(start, end);

  /* Mostrar/ocultar itens */
  allItems.forEach(item => item.classList.add('hidden'));
  pageItems.forEach(item => item.classList.remove('hidden'));

  /* Contador */
  jobsCount.innerHTML = `<strong>${total}</strong> ${total === 1 ? 'vaga encontrada' : 'vagas encontradas'}`;

  /* Estado vazio */
  jobsEmpty.hidden  = total > 0;
  jobsList.hidden   = total === 0;

  /* Paginação */
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pageNumbers.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className   = 'page-number' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.setAttribute('aria-label', `Página ${i}`);
    if (i === currentPage) btn.setAttribute('aria-current', 'page');
    btn.addEventListener('click', () => {
      currentPage = i;
      render();
      jobsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    pageNumbers.appendChild(btn);
  }

  pagePrev.disabled = currentPage <= 1;
  pageNext.disabled = currentPage >= totalPages;
}



/* ------------------------------------------
   Inicializar
   ------------------------------------------ */
apply();
