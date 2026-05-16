const usuario_curso = [
  { usuario_id: 1, curso_nome: "Introdução à Programação com Python", escola: "Tech Academy", status: "em_andamento" },
  { usuario_id: 1, curso_nome: "Libras - Língua Brasileira de Sinais", escola: "Acessibilidade BR", status: "em_andamento" },
  { usuario_id: 1, curso_nome: "Lógica de Programação", escola: "Code Foundation", status: "concluido" },
  { usuario_id: 1, curso_nome: "Excel do Básico ao Avançado", escola: "Capacita+", status: "concluido" },
];

const usuario_vaga = [
  { usuario_id: 1, vaga_id: 1 },
  { usuario_id: 1, vaga_id: 4 },
  { usuario_id: 1, vaga_id: 7 },
  { usuario_id: 1, vaga_id: 9 },
];

function getVagasDoStorage() {
  return vagas;
}

function getCursosDoStorage() {
  return JSON.parse(localStorage.getItem("cursos")) || [];
}


function renderizarMeusCursos(termoBusca = "") {
  const container = document.getElementById("listaMeusCursos");
  const empty = document.getElementById("emptyCursos");
  container.innerHTML = "";

  const cursos = getVagasDoStorage(); 
  getCursosDoStorage(); 

  const cursosUsuario = usuario_curso.filter(c => c.usuario_id === 1);
  const filtrados = cursosUsuario.filter(c =>
    c.curso_nome.toLowerCase().includes(termoBusca) ||
    c.escola.toLowerCase().includes(termoBusca)
  );

  if (filtrados.length === 0) {
    empty.hidden = false;
    container.hidden = true;
    return;
  }

  empty.hidden = true;
  container.hidden = false;

  filtrados.forEach(curso => {
    const emAndamento = curso.status === "em_andamento";
    const badge = emAndamento
      ? '<span class="tag tag-clt"><i class="fa-solid fa-play" style="margin-right:4px"></i>Em andamento</span>'
      : '<span class="tag tag-mode"><i class="fa-solid fa-check" style="margin-right:4px"></i>Concluído</span>';

    container.innerHTML += `
      <li class="job-item" data-status-curso="${curso.status}">
        <div class="job-item-header">
          <div>
            <h3 class="job-item-title">${curso.curso_nome}</h3>
            <p class="job-item-company">
              <i class="fa-solid fa-school" aria-hidden="true"></i> ${curso.escola}
            </p>
          </div>
          <div class="job-item-icon" aria-hidden="true">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
        </div>
        <div class="job-item-tags">
          ${badge}
        </div>
        <div class="job-item-footer">
          <span></span>
          <a href="Cursos.html" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-eye" aria-hidden="true"></i> Ver Curso
          </a>
        </div>
      </li>
    `;
  });
}


function renderizarMinhasVagas(termoBusca = "") {
  const container = document.getElementById("listaMinhasVagas");
  const empty = document.getElementById("emptyVagas");
  container.innerHTML = "";

  const todasVagas = getVagasDoStorage();
  console.log(todasVagas);

  const vagasUsuario = usuario_vaga
    .filter(v => v.usuario_id === 1)
    .map(v => {
      const vaga = todasVagas.find(j => j.id === v.vaga_id);
      return vaga || null;
    })
    .filter(Boolean);

  const filtradas = vagasUsuario.filter(v =>
    v.titulo.toLowerCase().includes(termoBusca) ||
    v.empresa.toLowerCase().includes(termoBusca) ||
    v.local.toLowerCase().includes(termoBusca)
  );

  if (filtradas.length === 0) {
    empty.hidden = false;
    container.hidden = true;
    return;
  }

  empty.hidden = true;
  container.hidden = false;

  filtradas.forEach(v => {
    const dataAtual = new Date();
    const dataV = new Date(v.data);
    const dias = Math.max(0, Math.floor((dataAtual - dataV) / (1000 * 60 * 60 * 24)));

    const defV = v.deficiencia ? v.deficiencia.split(" ") : [];

    container.innerHTML += `
      <li class="job-item"
        data-deficiencia="${v.deficiencia || ''}"
        data-modalidade="${v.modalidade || ''}"
        data-contrato="${v.contrato || ''}">
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
        <p class="job-item-desc">${v.descricao}</p>
        <div class="job-item-meta">
          <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${v.local}</span>
          <span><i class="fa-regular fa-clock" aria-hidden="true"></i> Há ${dias} dias</span>
        </div>
        <div class="job-item-tags">
          ${v.contrato ? `<span class="tag tag-clt">${formatarContrato(v.contrato)}</span>` : ''}
          ${v.modalidade ? `<span class="tag tag-mode">${formatarModalidade(v.modalidade)}</span>` : ''}
          ${defV.map(d => `<span class="tag tag-disability">${formatarDeficiencia(d)}</span>`).join('')}
        </div>
        <div class="job-item-footer">
          <span class="job-item-salary">R$ ${v.salario_minimo || "A combinar"} – R$ ${v.salario_maximo || "A combinar"}</span>
          <a href="vagas_gui.html" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-eye" aria-hidden="true"></i> Ver Detalhes
          </a>
        </div>
      </li>
    `;
  });
}

function formatarModalidade(mod) {
  const map = { home: "Home Office", hibrido: "Híbrido", presencial: "Presencial" };
  return map[mod] || mod;
}

function formatarContrato(mod) {
  const map = { clt: "CLT", pj: "PJ", estagio: "Estágio", freelance: "Freelance" };
  return map[mod] || mod;
}

function formatarDeficiencia(mod) {
  const map = {
    fisica: "Def. Física",
    auditiva: "Def. Auditiva",
    visual: "Def. Visual",
    intelectual: "Def. Intelectual",
    todas: "Todas"
  };
  return map[mod] || mod;
}


function atualizarEstatisticas() {
  const cursosUsuario = usuario_curso.filter(c => c.usuario_id === 1);
  const emAndamento = cursosUsuario.filter(c => c.status === "em_andamento").length;
  const concluidos = cursosUsuario.filter(c => c.status === "concluido").length;
  const vagasUsuario = usuario_vaga.filter(v => v.usuario_id === 1).length;

  document.getElementById("statTotalCursos").textContent = cursosUsuario.length;
  document.getElementById("statEmAndamento").textContent = emAndamento;
  document.getElementById("statConcluidos").textContent = concluidos;
  document.getElementById("statTotalVagas").textContent = vagasUsuario;
}



document.getElementById("searchCursos").addEventListener("input", (e) => {
  renderizarMeusCursos(e.target.value.toLowerCase().trim());
});

document.getElementById("searchVagas").addEventListener("input", (e) => {
  renderizarMinhasVagas(e.target.value.toLowerCase().trim());
});


atualizarEstatisticas();
renderizarMeusCursos();
renderizarMinhasVagas();
