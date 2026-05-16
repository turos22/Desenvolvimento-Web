const bancoDeVagas = [
    { id: 1, titulo: "Desenvolvedor Front-end", empresa: "Tech Inclusiva", local: "Remoto", pcd: "Física", categoria: "fisica" },
    { id: 2, titulo: "Auxiliar Administrativo", empresa: "Global Corp", local: "São Paulo, SP", pcd: "Auditiva", categoria: "auditiva" },
    { id: 3, titulo: "Analista de Dados", empresa: "Data Analytics", local: "Curitiba, PR", pcd: "Visual", categoria: "visual" },
    { id: 4, titulo: "Designer UX/UI", empresa: "Criativa Soft", local: "Remoto", pcd: "Física", categoria: "fisica" },
    { id: 5, titulo: "Recepcionista", empresa: "Hotel Estrela", local: "Rio de Janeiro, RJ", pcd: "Auditiva", categoria: "auditiva" },
    { id: 6, titulo: "Porteiro", empresa: "Condomínio Vida", local: "Belo Horizonte, MG", pcd: "Física", categoria: "fisica" },
    { id: 7, titulo: "Gerente de Projetos", empresa: "Inova Mundi", local: "Híbrido", pcd: "Visual", categoria: "visual" },
    { id: 8, titulo: "Estágio em TI", empresa: "StartUp X", local: "Remoto", pcd: "Física", categoria: "fisica" },
    { id: 9, titulo: "Operador de Caixa", empresa: "Supermercado Ideal", local: "Salvador, BA", pcd: "Auditiva", categoria: "auditiva" },
    { id: 10, titulo: "Analista de RH", empresa: "Pessoas & Valores", local: "São Paulo, SP", pcd: "Física", categoria: "fisica" },
    { id: 11, titulo: "Editor de Vídeo", empresa: "Mídia Flow", local: "Remoto", pcd: "Auditiva", categoria: "auditiva" },
    { id: 12, titulo: "Bibliotecário", empresa: "Educa Mais", local: "Porto Alegre, RS", pcd: "Visual", categoria: "visual" }
];

let paginaAtual = 1;
const itensPorPagina = 6;
let vagasFiltradas = [...bancoDeVagas];

function atualizarControles() {
    const btnEsquerda = document.getElementById('seta-esquerda');
    const btnDireita = document.getElementById('seta-direita');
    const infoPagina = document.getElementById('info-pagina');
    
    const totalPaginas = Math.ceil(vagasFiltradas.length / itensPorPagina);
    
    if (btnEsquerda) btnEsquerda.disabled = (paginaAtual === 1);
    if (btnDireita) btnDireita.disabled = (paginaAtual === totalPaginas || totalPaginas === 0);
    if (infoPagina) infoPagina.innerText = `Página ${paginaAtual} de ${totalPaginas || 1}`;
}

window.renderizarVagas = function() {
    const container = document.getElementById('listaVagas');
    if (!container) return; 

    container.innerHTML = '';
    
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const vagasExibidas = vagasFiltradas.slice(inicio, fim);

    if (vagasExibidas.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5"><p>Nenhuma vaga encontrada.</p></div>`;
        atualizarControles();
        return;
    }

    container.innerHTML = vagasExibidas.map(vaga => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card vaga-card shadow-sm border">
                <div class="card-body d-flex flex-column justify-content-between" style="height: 250px;">
                    <div>
                        <span class="badge badge-pcd mb-2 p-2">${vaga.pcd}</span>
                        <h5 class="card-title fw-bold">${vaga.titulo}</h5>
                        <p class="text-primary mb-1">${vaga.empresa}</p>
                        <p class="text-muted small"><i class="fa-solid fa-location-dot me-1"></i>${vaga.local}</p>
                    </div>
                    <button class="btn btn-outline-primary btn-sm w-100 fw-bold">Ver Detalhes</button>
                </div>
            </div>
        </div>
    `).join('');

    atualizarControles();
}

window.mudarPagina = function(direcao) {
    const totalPaginas = Math.ceil(vagasFiltradas.length / itensPorPagina);
    if ((direcao === 1 && paginaAtual < totalPaginas) || (direcao === -1 && paginaAtual > 1)) {
        paginaAtual += direcao;
        renderizarVagas();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Escuta o filtro de busca
    const formFiltro = document.getElementById('filtroVagas');
    if (formFiltro) {
        formFiltro.addEventListener('submit', (e) => {
            e.preventDefault();
            const termo = document.getElementById('inputBusca').value.toLowerCase().trim();
            const categoria = document.getElementById('selectPcd').value;

            vagasFiltradas = bancoDeVagas.filter(vaga => {
                const bateTexto = vaga.titulo.toLowerCase().includes(termo) || vaga.empresa.toLowerCase().includes(termo);
                const batePcd = categoria === "todas" || vaga.categoria === categoria;
                return bateTexto && batePcd;
            });

            paginaAtual = 1;
            renderizarVagas();
        });
    }

    renderizarVagas(); // Chamada inicial
});