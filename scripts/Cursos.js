const cursos = [
    // --- INICIANTE ---
    { nome: "Introdução à Programação com Python", escola: "Tech Academy", horas: 40, nivel: "Iniciante", categoria: "Tecnologia", preco: "Gratuito" },
    { nome: "Atendimento ao Cliente", escola: "Instituto Inclusão", horas: 15, nivel: "Iniciante", categoria: "Comunicação", preco: "Gratuito" },
    { nome: "Marketing Digital para Iniciantes", escola: "Digital School", horas: 30, nivel: "Iniciante", categoria: "Marketing", preco: "Pago" },
    { nome: "Libras - Língua Brasileira de Sinais", escola: "Acessibilidade BR", horas: 60, nivel: "Iniciante", categoria: "Comunicação", preco: "Gratuito" },
    { nome: "Lógica de Programação", escola: "Code Foundation", horas: 20, nivel: "Iniciante", categoria: "Tecnologia", preco: "Gratuito" },
    { nome: "Fundamentos de UX Design", escola: "Creative Hub", horas: 25, nivel: "Iniciante", categoria: "Design", preco: "Pago" },

    // --- INTERMEDIÁRIO ---
    { nome: "Análise de Dados com SQL", escola: "Data Insights", horas: 45, nivel: "Intermediário", categoria: "Tecnologia", preco: "Gratuito" },
    { nome: "Gestão de Projetos Ágeis", escola: "Business Pro", horas: 35, nivel: "Intermediário", categoria: "Administração", preco: "Pago" },
    { nome: "Photoshop para Social Media", escola: "Design Lab", horas: 30, nivel: "Intermediário", categoria: "Design", preco: "Gratuito" },
    { nome: "Inglês para Negócios", escola: "Global Lang", horas: 50, nivel: "Intermediário", categoria: "Comunicação", preco: "Pago" },
    { nome: "JavaScript Intermediário", escola: "Dev Master", horas: 40, nivel: "Intermediário", categoria: "Tecnologia", preco: "Gratuito" },

    // --- AVANÇADO ---
    { nome: "Machine Learning e IA", escola: "Future Tech", horas: 80, nivel: "Avançado", categoria: "Tecnologia", preco: "Pago" },
    { nome: "Arquitetura de Software Cloud", escola: "Cloud Solutions", horas: 60, nivel: "Avançado", categoria: "Tecnologia", preco: "Gratuito" },
    { nome: "Estratégias de Branding Avançado", escola: "Marketing Elite", horas: 40, nivel: "Avançado", categoria: "Marketing", preco: "Pago" },
    { nome: "Desenvolvimento de Apps com React Native", escola: "Mobile Expert", horas: 55, nivel: "Avançado", categoria: "Tecnologia", preco: "Gratuito" },

    // --- TODOS OS NÍVEIS ---
    { nome: "Excel do Básico ao Avançado", escola: "Capacita+", horas: 20, nivel: "Todos os níveis", categoria: "Administração", preco: "Gratuito" },
    { nome: "Educação Financeira Pessoal", escola: "Finança Viva", horas: 10, nivel: "Todos os níveis", categoria: "Finanças", preco: "Gratuito" },
    { nome: "Primeiros Socorros no Trabalho", escola: "Saúde Vital", horas: 12, nivel: "Todos os níveis", categoria: "Saúde", preco: "Gratuito" }
];


let paginaAtual = 1;
const itensPorPagina = 6;
let cursosFiltrados = JSON.parse(localStorage.getItem("cursos")); // Inicia com todos os cursos

const listaCursos = document.getElementById('listaCursos');
const filtroForm = document.getElementById('filtroCursos');

const paginacaoContainer = document.createElement('div');
paginacaoContainer.className = "d-flex justify-content-center align-items-center gap-3 mt-5";
listaCursos.parentNode.insertBefore(paginacaoContainer, listaCursos.nextSibling);

function carregar_cursos(){
    let cursos_local = JSON.parse(localStorage.getItem("cursos"));
    if (!cursos_local)
    {
        localStorage.setItem("cursos",  JSON.stringify(cursos));
        console.log("cursos carregados!");
    }
}

function renderizarCursos() {
    listaCursos.innerHTML = '';
    
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const cursosExibidos = cursosFiltrados.slice(inicio, fim);

    if (cursosExibidos.length === 0) {
        listaCursos.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">Nenhum curso encontrado.</p></div>';
        paginacaoContainer.innerHTML = '';
        return;
    }

    cursosExibidos.forEach(curso => {
        listaCursos.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card curso-card h-100 border-light shadow-sm">
                    <div class="card-body d-flex flex-column text-start">
                        
                        <div class="mb-2">
                            <span class="badge badge-categoria bg-light text-muted border text-capitalize">${curso.categoria}</span>
                        </div>
                        
                        <div class="text-muted small fw-bold text-uppercase mb-1">${curso.nivel}</div>
                        
                        <div class="mb-auto">
                            <h5 class="card-title fw-bold mb-2" style="min-height: 3rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                ${curso.nome}
                            </h5>
                            <p class="text-muted small mb-0">
                                <i class="fa-solid fa-school me-2"></i>${curso.escola}
                            </p>
                        </div>

                        <div class="mt-4">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="small text-muted">
                                    <i class="fa-regular fa-clock me-1"></i> ${curso.horas}h
                                </span>
                                <span class="${curso.preco === 'Gratuito' ? 'text-success fw-bold' : 'text-dark fw-bold'}">
                                    ${curso.preco}
                                </span>
                            </div>
                            <button class="btn btn-outline-primary w-100 fw-bold py-2" style="border-radius: 8px; border: 1px solid #2b4acb;">
                                Ver Detalhes
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        `;
    });

    renderizarControlesPagina();
}

function renderizarControlesPagina() {
    const totalPaginas = Math.ceil(cursosFiltrados.length / itensPorPagina);
    
    paginacaoContainer.innerHTML = `
        <button class="btn btn-primary" ${paginaAtual === 1 ? 'disabled' : ''} onclick="mudarPagina(-1)">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
        <span class="fw-bold">Página ${paginaAtual} de ${totalPaginas}</span>
        <button class="btn btn-primary" ${paginaAtual === totalPaginas ? 'disabled' : ''} onclick="mudarPagina(1)">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;
}

window.mudarPagina = (direcao) => {
    paginaAtual += direcao;
    renderizarCursos();
    window.scrollTo(0, 400); // Rola para cima para ver os novos cursos
};

filtroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const busca = document.getElementById('inputBusca').value.toLowerCase();
    const nivel = document.getElementById('selectNivel').value;

    cursosFiltrados = cursos.filter(c => {
        const matchesTexto = c.nome.toLowerCase().includes(busca) || c.categoria.toLowerCase().includes(busca);
        const matchesNivel = nivel === 'todos' || c.nivel === nivel || c.nivel === 'Todos os níveis';
        return matchesTexto && matchesNivel;
    });

    paginaAtual = 1; // Reseta para a primeira página ao filtrar
    renderizarCursos();
});

// Inicialização
carregar_cursos();
renderizarCursos();