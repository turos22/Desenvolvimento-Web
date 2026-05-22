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

    const container =
      document.getElementById("empresaJobsList");

    container.innerHTML = "";

    // FILTRA SOMENTE AS VAGAS DA EMPRESA LOGADA
    const vagasFiltradas = listaVagas.filter(
      v => v.empresaId == usu_logado.usu_id
    );

    console.log(vagasFiltradas);

    vagasFiltradas.forEach(v => {

        const defV = v.deficiencia.split(" ");

        const dataAtual = new Date();

        const dataV = new Date(v.data);

        const dias = Math.floor(
          (dataAtual - dataV)
          / (1000 * 60 * 60 * 24)
        );

        const ativa =
          v.status === 'ativa';

        const classePausada =
          v.status === 'pausada'
            ? 'pausada'
            : '';

        container.innerHTML += `
        <li class="empresa-job-card ${classePausada}"
            data-id="${v.id}"
            data-titulo="${v.titulo}"
            data-empresa="${v.empresa}"
            data-descricao="${v.descricao}"
            data-modalidade="${v.modalidade}"
            data-contrato="${v.contrato}"
            data-deficiencia="${v.deficiencia}"
            data-salario-min="${v.salario_minimo}"
            data-salario-max="${v.salario_maximo}"
            data-status="${v.status}"
            data-tempo="${dias}"
            data-rua="${v.endereco.rua}"
            data-numero="${v.endereco.numero}"
            data-bairro="${v.endereco.bairro}"
            data-cep="${v.endereco.cep}"
            data-cidade="${v.endereco.cidade}"
            data-estado="${v.endereco.estado}"
            data-escolaridade="${v.escolaridade}"
            data-beneficios="${v.beneficios}"
            data-requisitos="${v.requisitos}"
            data-requisitos-opcionais="${v.requisitos_opcionais}"
            data-responsabilidades="${v.responsabilidades}">
            <div class="empresa-job-main">
              <div class="job-item-header">
                <div>
                  <h3 class="job-item-title">${v.titulo}</h3>
                  <p class="job-item-company">
                    <i class="fa-regular fa-building" aria-hidden="true"></i> ${v.empresa}
                  </p>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                  <span class="status-badge status-${v.status}">${formatarStatus(v.status)}</span>
                  <div class="job-select">
                    <input
                      type="checkbox"
                      class="vaga-checkbox"
                      value="${v.id}"
                    >
                  </div>
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
              <span>
                <i class="fa-regular fa-clock" aria-hidden="true"></i>
                Há ${dias} dias
              </span>
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
      
        
    });
    configurarSelectAll();
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

function formatarEscolaridade(mod) {
    switch(mod) {
        case "medio": return "Ensino Médio";
        case "graduacao": return "Graduação";
        case "pos": return "Pós-Graduação";
        default: return mod;
    }
}

function configurarSelectAll() {

  const selectAll =
    document.getElementById('selectAllVagas');

  if (!selectAll) return;

  selectAll.onchange = function () {

    document
      .querySelectorAll('.vaga-checkbox')
      .forEach(cb => {

        cb.checked = this.checked;

      });

  };

}

function deletarVagasSelecionadas() {

  const checks = document.querySelectorAll(
    '.vaga-checkbox:checked'
  );

  if (checks.length === 0) {

    alert('Selecione ao menos uma vaga.');

    return;
  }

  vagasSelecionadasParaExcluir =
    [...checks].map(
      c => Number(c.value)
    );

  deleteJobName.textContent =
    `${checks.length} vaga(s) selecionada(s)`;

  deleteOverlay.setAttribute(
    'aria-hidden',
    'false'
  );

  document.body.style.overflow = 'hidden';
}

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
let vagasSelecionadasParaExcluir = [];

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
    document.getElementById('vDescricao').value= card.dataset.descricao|| '';
    document.getElementById('vModalidade').value = card.dataset.modalidade || 'presencial';
    document.getElementById('vContrato').value   = card.dataset.contrato   || 'clt';
    document.getElementById('vSalarioMin').value = card.dataset.salarioMin || '';
    document.getElementById('vSalarioMax').value = card.dataset.salarioMax || '';
    document.getElementById('cep').value = card.dataset.cep || '';
    document.getElementById('rua').value = card.dataset.rua || '';
    document.getElementById('bairro').value = card.dataset.bairro || '';
    document.getElementById('numero_end').value = card.dataset.numero || '';
    document.getElementById('cidade').value = card.dataset.cidade || '';
    document.getElementById('uf').value = card.dataset.estado || '';
    document.getElementById('vEscolaridade').value = card.dataset.escolaridade || 'medio';
    document.getElementById('vBeneficios').value = card.dataset.beneficios || '';
    document.getElementById('vRequisitos').value = card.dataset.requisitos || '';
    document.getElementById('vRequisitosOpcionais').value = card.dataset.requisitosOpcionais || '';
    document.getElementById('vResponsabilidades').value = card.dataset.responsabilidades || '';

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
  const descricao= document.getElementById('vDescricao').value.trim();
  const modalidade = document.getElementById('vModalidade').value;
  const contrato   = document.getElementById('vContrato').value;
  const salMin   = document.getElementById('vSalarioMin').value;
  const salMax   = document.getElementById('vSalarioMax').value;
  const rua = document.getElementById('rua').value.trim();
  const numero = document.getElementById('numero_end').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const cep = document.getElementById('cep').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const estado = document.getElementById('uf').value.trim();
  const defList  = Array.from(document.querySelectorAll('[name="vDeficiencia"]:checked')).map(cb => cb.value);
  const escolaridade = document.getElementById('vEscolaridade').value;
  const beneficios = document.getElementById('vBeneficios').value.trim();
  const requisitos = document.getElementById('vRequisitos').value.trim();
  const reqOpcionais = document.getElementById('vRequisitosOpcionais').value.trim();
  const responsabilidades = document.getElementById('vResponsabilidades').value.trim();

  const modeLabel = { presencial: 'Presencial', hibrido: 'Híbrido', home: 'Home Office' };
  const ctLabel   = { clt: 'CLT', pj: 'PJ', estagio: 'Estágio' };
  const defLabels = { fisica:'Deficiência Física', auditiva:'Deficiência Auditiva', visual:'Deficiência Visual', intelectual:'Deficiência Intelectual', todas:'Todas as Deficiências' };
  const escolaridadeLabel = { 'medio': 'Ensino Médio', graduacao: 'Graduação', 'pos': 'Pós-Graduação' };

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
      vaga.descricao = descricao;
      vaga.modalidade = modalidade;
      vaga.contrato = contrato;
      vaga.salario_minimo = salMin || 0;
      vaga.salario_maximo = salMax || 0;
      vaga.deficiencia = defList.join(" ");
      vaga.escolaridade = escolaridade;
      vaga.beneficios = beneficios;
      vaga.requisitos = requisitos;
      vaga.requisitos_opcionais = reqOpcionais;
      vaga.responsabilidades = responsabilidades;
      vaga.endereco = {
        rua: rua,
        numero: numero,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        estado: estado
      };
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
      modalidade: modalidade,
      contrato: contrato,
      deficiencia: defList.join(" "),
      salario_minimo: salMin || 0,
      salario_maximo: salMax || 0,
      descricao: descricao,
      data: new Date().toISOString().split("T")[0],
      status: "ativa",
      escolaridade: escolaridade,
      beneficios: beneficios,
      requisitos: requisitos,
      requisitos_opcionais: reqOpcionais,
      responsabilidades: responsabilidades,
      endereco: {
        rua: rua,
        numero: numero,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        estado: estado
      }
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

  let primeiroErro = null;

  const campos = [
    { id: 'vTitulo', msg: 'Informe o título da vaga.' },
    { id: 'vDescricao', msg: 'Escreva a descrição.' },
    
    { id: 'vBeneficios', msg: 'Descreva os benefícios oferecidos.' },
    { id: 'vRequisitos', msg: 'Descreva os requisitos necessários.' },
    { id: 'vEscolaridade', msg: 'Selecione o nível de escolaridade.' },
    { id: 'vResponsabilidades', msg: 'Descreva as responsabilidades do cargo.' },

    { id: 'vModalidade', msg: 'Selecione a modalidade.' },
    { id: 'vContrato', msg: 'Selecione o tipo de contrato.' },

    { id: 'cep', msg: 'Informe o CEP.' },
    { id: 'rua', msg: 'Informe a rua.' },
    { id: 'bairro', msg: 'Informe o bairro.' },
    { id: 'numero_end', msg: 'Informe o número.' },
    { id: 'cidade', msg: 'Informe a cidade.' },
    { id: 'uf', msg: 'Informe a UF.' }
  ];

  campos.forEach(campo => {

    const valid =
      validateField(campo.id, campo.msg);

    if (!valid) {

      ok = false;

      // salva apenas o primeiro erro
      if (!primeiroErro) {
        primeiroErro =
          document.getElementById(campo.id);
      }
    }
  });

  // foco no primeiro erro
  if (primeiroErro) {

    primeiroErro.focus();

    primeiroErro.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

  return ok;
}

function validateField(id, msg) {

  const el = document.getElementById(id);

  if (!el) return true;

  const modalidade =
    document.getElementById('vModalidade')?.value;

  const camposEndereco = [
    'cep',
    'rua',
    'bairro',
    'numero_end',
    'cidade',
    'uf'
  ];

  // Ignora endereço em Home Office
  if (
    modalidade === 'home' &&
    camposEndereco.includes(id)
  ) {

    limparErro(el);
    return true;
  }

  const err =
    el.closest('.form-group')
      ?.querySelector('.field-error');

  if (!el.value.trim()) {

    el.classList.add('invalid');

    el.style.borderColor = '#dc3545';
    el.style.boxShadow =
      '0 0 0 4px rgba(220, 53, 69, 0.25)';
    el.style.backgroundColor = '#fff5f5';

    if (err) {
      err.textContent = msg;
      err.style.color = '#dc3545';
      err.style.fontWeight = '600';
    }

    return false;

  } else {

    limparErro(el);
    return true;
  }
}

function limparErro(el) {

  const err =
    el.closest('.form-group')
      ?.querySelector('.field-error');

  el.classList.remove('invalid');
  el.classList.remove('focused-error');

  el.style.borderColor = '';
  el.style.boxShadow = '';
  el.style.backgroundColor = '';
  el.style.transform = '';

  if (err) {
    err.textContent = '';
    err.style.color = '';
    err.style.fontWeight = '';
  }
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

  deleteOverlay.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.style.overflow = '';

  pendingDeleteId = null;

  vagasSelecionadasParaExcluir = [];
}

deleteClose.addEventListener('click', closeDeleteModal);
deleteCancelBtn.addEventListener('click', closeDeleteModal);
deleteOverlay.addEventListener('click', e => { if (e.target === deleteOverlay) closeDeleteModal(); });

deleteConfirmBtn.addEventListener('click', () => {

  // EXCLUSÃO MÚLTIPLA
  if (vagasSelecionadasParaExcluir.length > 0) {

    vagas = vagas.filter(
      v => !vagasSelecionadasParaExcluir.includes(v.id)
    );

    vagasSelecionadasParaExcluir = [];
  }

  // EXCLUSÃO INDIVIDUAL
  else if (pendingDeleteId) {

    vagas = vagas.filter(
      v => v.id != pendingDeleteId
    );
  }

  localStorage.setItem(
    "vagas",
    JSON.stringify(vagas)
  );

  renderizarVagas(vagas, true);

  document.querySelectorAll('.empresa-job-card')
    .forEach(bindCardActions);

  updateStats();

  filterList();

  closeDeleteModal();
});

/* ------------------------------------------
   Busca em tempo real
   ------------------------------------------ */
empresaSearch.addEventListener('input', filterList);
empresaSort.addEventListener('change', filterList);

function filterList() {

  const q = empresaSearch.value
    .trim()
    .toLowerCase();

  const sort = empresaSort.value;

  const cards = Array.from(
    document.querySelectorAll('.empresa-job-card')
  );

  const empresaEmpty =
    document.getElementById('empresaEmpty');

  const actionsTop =
    document.querySelector('.empresa-actions-top');

  const actionsBar =
    document.querySelector('.empresa-actions-bar');

  /* =========================
     ORDENAR
     ========================= */

  const sorted = cards.sort((a, b) => {

    if (sort === 'recentes') {

      return Number(a.dataset.tempo)
        - Number(b.dataset.tempo);
    }

    if (sort === 'antigas') {

      return Number(b.dataset.tempo)
        - Number(a.dataset.tempo);
    }

    if (sort === 'ativas') {

      const aAtiva =
        a.dataset.status === 'ativa'
          ? 0
          : 1;

      const bAtiva =
        b.dataset.status === 'ativa'
          ? 0
          : 1;

      return aAtiva - bAtiva;
    }

    return 0;
  });

  sorted.forEach(card => {

    empresaJobsList.appendChild(card);

  });

  /* =========================
     FILTRAR
     ========================= */

  let visivel = 0;

  sorted.forEach(card => {

    const texto = (
      card.dataset.titulo +
      ' ' +
      card.dataset.descricao
    ).toLowerCase();

    const mostrar =
      !q || texto.includes(q);

    card.style.display =
      mostrar ? '' : 'none';

    if (mostrar) visivel++;

  });

  /* =========================
     ESTADO VAZIO
     ========================= */

  if (visivel === 0) {

  empresaEmpty.hidden = false;

  actionsTop.style.display = 'none';

  actionsBar.style.display = 'none';

  // DESMARCA O CHECKBOX
  const selectAll = document.getElementById('selectAllVagas');

  if (selectAll) {
    selectAll.checked = false;
  }

} else {

  empresaEmpty.hidden = true;

  actionsTop.style.display = 'flex';

  actionsBar.style.display = 'flex';

}
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

const modalidadeSelect = document.getElementById("vModalidade");
const locationFields = document.getElementById("locationFields");

modalidadeSelect.addEventListener("change", () => {

  const modalidade = modalidadeSelect.value;

  if (modalidade === "presencial" || modalidade === "hibrido") {
    locationFields.classList.remove("hidden");
  } else {
    locationFields.classList.add("hidden");
  }

});

window.addEventListener('DOMContentLoaded', () => {

  renderizarVagas(vagas, true);

  document
    .querySelectorAll('.empresa-job-card')
    .forEach(bindCardActions);

  updateStats();

  filterList();

});