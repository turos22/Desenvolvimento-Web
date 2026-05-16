/* ==========================================
   vagas-empresa.js — Gerenciamento de vagas
   ========================================== */

   /* ------------------------------------------
   Renderizar vagas
   ------------------------------------------ */
// const usu_logado = 
//   {
//     usu_id: 3,
//     usu_nome: "gui"
//   };
//import { usu_logado } from "./funcoes.js";
var usu_logado = JSON.parse(localStorage.getItem("usu_logado"));
function renderizarVagas(listaVagas, mostrarInativas = false) {
    const container = document.getElementById("empresaJobsList");
    container.innerHTML = "";

    // FILTRAR SE PRECISA MOSTRAR SÓ ATIVAS
    const vagasFiltradas = mostrarInativas 
        ? listaVagas 
        : listaVagas.filter(v => v.empresaId == usu_logado.usu_id);

    console.log(vagasFiltradas);
    console.log(usu_logado.usu_id);

    vagasFiltradas.forEach(v => {
      if(usu_logado.usu_id == v.empresaId){
        const defV = v.deficiencia.split(" ");
        const dataAtual = new Date();
        const dataV = new Date(v.data);
        const dias = Math.floor((dataAtual - dataV) / (1000 * 60 * 60 * 24));
        const ativa = v.status === 'ativa';
        const classePausada = v.status === 'pausada' ? 'pausada' : '';
        container.innerHTML += `
        <li class="empresa-job-card ${classePausada}"
            data-id="${v.id}"
            data-titulo="${v.titulo}"
            data-empresa="${v.empresa}"
            data-descricao="${v.descricao}"
            data-local="${v.local}"
            data-modalidade="${v.modalidade}"
            data-contrato="${v.contrato}"
            data-deficiencia="${v.deficiencia}"
            data-salario-min="${v.salario_minimo}"
            data-salario-max="${v.salario_maximo}"
            data-status="${v.status}"
            data-tempo="${dias}">
            <div class="empresa-job-main">
              <div class="job-item-header">
                <div>
                  <h3 class="job-item-title">${v.titulo}</h3>
                  <p class="job-item-company">
                    <i class="fa-regular fa-building" aria-hidden="true"></i> ${v.empresa}
                  </p>
                </div>
                <span class="status-badge status-${v.status}">${formatarStatus(v.status)}</span>
              </div>
              <p class="job-item-desc">
                ${v.descricao}
              </p>
              <div class="job-item-meta">
                <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${v.local}</span>
                <span><i class="fa-regular fa-clock" aria-hidden="true"></i> Há ${dias} dias</span>
              </div>
              <div class="job-item-tags">
                <span class="tag tag-clt">${formatarContrato(v.contrato)}</span>
            <span class="tag tag-mode">${formatarModalidade(v.modalidade)}</span>
            ${defV.map(d => `<span class="tag tag-disability">${formatarDeficiencia(d)}</span>`).join('')}
              </div>
            </div>
            <div class="empresa-job-footer">
              <span class="job-item-salary">R$ ${v.salario_minimo} – R$ ${v.salario_maximo}</span>
              <div class="empresa-job-actions">
                <button class="btn-action btn-activate" data-id="${v.id}" style="display:${ativa ? 'none' : ''}" aria-label="Ativar vaga">
                  <i class="fa-solid fa-play" aria-hidden="true"></i> Ativar
                </button>
                <button class="btn-action btn-pause" data-id="${v.id}" style="display:${ativa ? '' : 'none'}" aria-label="Pausar vaga">
                  <i class="fa-solid fa-pause" aria-hidden="true"></i> Pausar
                </button>
                <button class="btn-action btn-edit" data-id="${v.id}" aria-label="Editar vaga">
                  <i class="fa-solid fa-pen" aria-hidden="true"></i> Editar
                </button>
                <button class="btn-action btn-delete" data-id="${v.id}" aria-label="Excluir vaga">
                  <i class="fa-solid fa-trash" aria-hidden="true"></i> Excluir
                </button>
              </div>
            </div>
          </li>
        `;
      }
        
    });
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

function formatarStatus(mod) {
    switch(mod) {
        case "ativa": return "Ativa";
        case "pausada": return "Pausada";
        default: return mod;
    }
}

renderizarVagas(vagas, true);

/* ------------------------------------------
   Elementos
   ------------------------------------------ */
const btnNovaVaga    = document.getElementById('btnNovaVaga');
const modalOverlay   = document.getElementById('modalOverlay');
const modalClose     = document.getElementById('modalClose');
const modalCancel    = document.getElementById('modalCancel');
const modalSubmit    = document.getElementById('modalSubmit');
const modalTitle     = document.getElementById('modalTitle');
const vagaForm       = document.getElementById('vagaForm');

const deleteOverlay  = document.getElementById('deleteOverlay');
const deleteClose    = document.getElementById('deleteClose');
const deleteCancelBtn= document.getElementById('deleteCancelBtn');
const deleteConfirmBtn= document.getElementById('deleteConfirmBtn');
const deleteJobName  = document.getElementById('deleteJobName');

const empresaSearch  = document.getElementById('empresaSearch');
const empresaSort    = document.getElementById('empresaSort');
const empresaJobsList= document.getElementById('empresaJobsList');
const empresaEmpty   = document.getElementById('empresaEmpty');

const statTotal      = document.getElementById('statTotal');
const statAtivas     = document.getElementById('statAtivas');
const statPausadas   = document.getElementById('statPausadas');


let pendingDeleteId  = null;

/* ------------------------------------------
   Abrir / fechar modal de vaga
   ------------------------------------------ */
function openModal(editId = null) {
  vagaForm.reset();
  document.getElementById('vagaId').value = '';

  if (editId) {
    const card = document.querySelector(`.empresa-job-card[data-id="${editId}"]`);
    if (!card) return;

    modalTitle.textContent = 'Editar Vaga';
    document.getElementById('modalSubtitle').textContent = 'Atualize as informações da vaga publicada';
    modalSubmit.innerHTML = '<i class="fa-solid fa-floppy-disk" aria-hidden="true"></i> Salvar Alterações';
    document.getElementById('vagaId').value    = editId;
    document.getElementById('vTitulo').value   = card.dataset.titulo   || '';
    document.getElementById('vLocal').value    = card.dataset.local    || '';
    document.getElementById('vDescricao').value= card.dataset.descricao|| '';
    document.getElementById('vModalidade').value = card.dataset.modalidade || 'presencial';
    document.getElementById('vContrato').value   = card.dataset.contrato   || 'clt';
    document.getElementById('vSalarioMin').value = card.dataset.salarioMin || '';
    document.getElementById('vSalarioMax').value = card.dataset.salarioMax || '';

    const defSelected = (card.dataset.deficiencia || '').split(' ');
    document.querySelectorAll('[name="vDeficiencia"]').forEach(cb => {
      cb.checked = defSelected.includes(cb.value);
    });
  } else {
    modalTitle.textContent  = 'Nova Vaga';
    document.getElementById('modalSubtitle').textContent = 'Preencha as informações para publicar a vaga na plataforma';
    modalSubmit.innerHTML = '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Publicar Vaga';
  }

  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('vTitulo').focus();
}

function closeModal() {
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

btnNovaVaga.addEventListener('click', () => openModal());
modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

/* ------------------------------------------
   Submeter formulário (criar ou editar)
   ------------------------------------------ */
vagaForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateVagaForm()) return;

  const id       = document.getElementById('vagaId').value;
  const titulo   = document.getElementById('vTitulo').value.trim();
  const local    = document.getElementById('vLocal').value.trim();
  const descricao= document.getElementById('vDescricao').value.trim();
  const modalidade = document.getElementById('vModalidade').value;
  const contrato   = document.getElementById('vContrato').value;
  const salMin   = document.getElementById('vSalarioMin').value;
  const salMax   = document.getElementById('vSalarioMax').value;
  const defList  = Array.from(document.querySelectorAll('[name="vDeficiencia"]:checked')).map(cb => cb.value);

  const modeLabel = { presencial: 'Presencial', hibrido: 'Híbrido', homeoffice: 'Home Office' };
  const ctLabel   = { clt: 'CLT', pj: 'PJ', estagio: 'Estágio' };
  const defLabels = { fisica:'Deficiência Física', auditiva:'Deficiência Auditiva', visual:'Deficiência Visual', intelectual:'Deficiência Intelectual', todas:'Todas as Deficiências' };

  const salarioStr = (salMin && salMax)
    ? `R$ ${Number(salMin).toLocaleString('pt-BR')} – R$ ${Number(salMax).toLocaleString('pt-BR')}`
    : salMin ? `A partir de R$ ${Number(salMin).toLocaleString('pt-BR')}` : 'A combinar';

  if (id) {
    /* =========================
       EDITAR VAGA EXISTENTE
       ========================= */
    const vaga = vagas.find(v => v.id == id);

    if (vaga) {
      vaga.titulo = titulo;
      vaga.local = local;
      vaga.descricao = descricao;
      vaga.modalidade = modalidade;
      vaga.contrato = contrato;
      vaga.salario_minimo = salMin || 0;
      vaga.salario_maximo = salMax || 0;
      vaga.deficiencia = defList.join(" ");
    }

  } else {
    /* =========================
       CRIAR NOVA VAGA
       ========================= */
    const novaVaga = {
      id: Date.now(),
      titulo: titulo,
      empresa: usu_logado.nome,
      empresaId: usu_logado.usu_id,
      local: local,
      modalidade: modalidade,
      contrato: contrato,
      deficiencia: defList.join(" "),
      salario_minimo: salMin || 0,
      salario_maximo: salMax || 0,
      descricao: descricao,
      data: new Date().toISOString().split("T")[0],
      status: "ativa"
    };
    vagas.push(novaVaga);
  }

  localStorage.setItem("vagas", JSON.stringify(vagas));

  /* =========================
     RE-RENDERIZA TUDO
     ========================= */
  renderizarVagas(vagas, true);

  document.querySelectorAll('.empresa-job-card')
    .forEach(bindCardActions);

  updateStats();
  filterList();
  closeModal();
});

/* ------------------------------------------
   Validação do formulário
   ------------------------------------------ */
function validateVagaForm() {
  let ok = true;
  [
    { id: 'vTitulo',   msg: 'Informe o título da vaga.' },
    { id: 'vLocal',    msg: 'Informe a localização.' },
    { id: 'vDescricao',msg: 'Escreva a descrição.' },
  ].forEach(({ id, msg }) => {
    const el = document.getElementById(id);
    const err = el.closest('.form-group').querySelector('.field-error');
    if (!el.value.trim()) {
      el.classList.add('invalid');
      if (err) err.textContent = msg;
      ok = false;
    } else {
      el.classList.remove('invalid');
      if (err) err.textContent = '';
    }
  });
  return ok;
}

/* ------------------------------------------
   Ações nas vagas (pausar, ativar, editar, excluir)
   ------------------------------------------ */
function bindCardActions(card) {
  card.querySelector('.btn-edit')?.addEventListener('click', () => {
    openModal(card.dataset.id);
  });

  card.querySelector('.btn-pause')?.addEventListener('click', () => {
    setStatus(card, 'pausada');
  });

  card.querySelector('.btn-activate')?.addEventListener('click', () => {
    setStatus(card, 'ativa');
  });

  card.querySelector('.btn-delete')?.addEventListener('click', () => {
    pendingDeleteId = card.dataset.id;
    deleteJobName.textContent = `"${card.dataset.titulo}"`;
    deleteOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
}

function setStatus(card, status) {
  const id = card.dataset.id;

  const vaga = vagas.find(v => v.id == id);
  if (vaga) {
    vaga.status = status;
  }

  localStorage.setItem("vagas", JSON.stringify(vagas));

  card.dataset.status = status;
  card.classList.toggle('pausada', status === 'pausada');

  const badge    = card.querySelector('.status-badge');
  const btnPause = card.querySelector('.btn-pause');
  const btnAct   = card.querySelector('.btn-activate');

  if (badge) {
    badge.textContent = status === 'ativa' ? 'Ativa' : 'Pausada';
    badge.className   = `status-badge status-${status}`;
  }

  if (btnPause) btnPause.style.display = status === 'ativa' ? '' : 'none';
  if (btnAct)   btnAct.style.display   = status === 'pausada' ? '' : 'none';

  updateStats();
}

/* ------------------------------------------
   Modal de exclusão
   ------------------------------------------ */
function closeDeleteModal() {
  deleteOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  pendingDeleteId = null;
}

deleteClose.addEventListener('click', closeDeleteModal);
deleteCancelBtn.addEventListener('click', closeDeleteModal);
deleteOverlay.addEventListener('click', e => { if (e.target === deleteOverlay) closeDeleteModal(); });

deleteConfirmBtn.addEventListener('click', () => {
  if (!pendingDeleteId) return;
  const card = document.querySelector(`.empresa-job-card[data-id="${pendingDeleteId}"]`);
  vagas = vagas.filter(v => v.id != pendingDeleteId);

  localStorage.setItem("vagas", JSON.stringify(vagas));

  renderizarVagas(vagas, true);

  document.querySelectorAll('.empresa-job-card')
    .forEach(bindCardActions);
  updateStats();
  closeDeleteModal();
});

/* ------------------------------------------
   Busca em tempo real
   ------------------------------------------ */
empresaSearch.addEventListener('input', filterList);
empresaSort.addEventListener('change', filterList);

function filterList() {
  const q     = empresaSearch.value.trim().toLowerCase();
  const sort  = empresaSort.value;
  const cards = Array.from(document.querySelectorAll('.empresa-job-card'));

  /* Ordenar */
  const sorted = cards.sort((a, b) => {
    if (sort === 'recentes') return Number(a.dataset.tempo) - Number(b.dataset.tempo);
    if (sort === 'antigas')  return Number(b.dataset.tempo) - Number(a.dataset.tempo);
    if (sort === 'ativas') {
      const aAtiva = a.dataset.status === 'ativa' ? 0 : 1;
      const bAtiva = b.dataset.status === 'ativa' ? 0 : 1;
      return aAtiva - bAtiva;
    }
    return 0;
  });

  sorted.forEach(card => empresaJobsList.appendChild(card));

  /* Filtrar por texto */
  let visivel = 0;
  sorted.forEach(card => {
    const texto = (card.dataset.titulo + ' ' + card.dataset.local + ' ' + card.dataset.descricao).toLowerCase();
    const mostrar = !q || texto.includes(q);
    card.style.display = mostrar ? '' : 'none';
    if (mostrar) visivel++;
  });

  empresaEmpty.hidden = visivel > 0;
}

/* ------------------------------------------
   Atualizar estatísticas
   ------------------------------------------ */
function updateStats() {
  const cards    = document.querySelectorAll('.empresa-job-card');
  const ativas   = document.querySelectorAll('.empresa-job-card[data-status="ativa"]');
  const pausadas = document.querySelectorAll('.empresa-job-card[data-status="pausada"]');
  if (statTotal)    statTotal.textContent    = cards.length;
  if (statAtivas)   statAtivas.textContent   = ativas.length;
  if (statPausadas) statPausadas.textContent = pausadas.length;
}

/* ------------------------------------------
   Inicializar ações nos cards existentes
   ------------------------------------------ */
document.querySelectorAll('.empresa-job-card').forEach(bindCardActions);
updateStats();

/* ------------------------------------------
   Fechar modais com Escape
   ------------------------------------------ */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (modalOverlay.getAttribute('aria-hidden') === 'false') closeModal();
  if (deleteOverlay.getAttribute('aria-hidden') === 'false') closeDeleteModal();
});
