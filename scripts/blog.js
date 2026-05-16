const postsData = [
    { id: 1, title: "Como a Lei de Cotas transforma o mercado", excerpt: "Entenda o impacto da legislação na inclusão de pessoas com deficiência.", author: "Equipe", date: "10 Mar", readTime: "8 min", category: "Legislação" },
    { id: 2, title: "5 dicas para se destacar em entrevistas", excerpt: "Prepare-se para conquistar a vaga dos seus sonhos com estratégias reais.", author: "Ana", date: "8 Mar", readTime: "5 min", category: "Carreira" },
    { id: 3, title: "Tecnologias assistivas no trabalho", excerpt: "Ferramentas que tornam o dia a dia profissional mais acessível.", author: "Carlos", date: "5 Mar", readTime: "6 min", category: "Tecnologia" },
    { id: 4, title: "História de sucesso: De estagiário a gerente", excerpt: "A trajetória inspiradora de João Silva na área de TI.", author: "Equipe", date: "1 Mar", readTime: "7 min", category: "Histórias" },
    { id: 5, title: "Direitos trabalhistas: Guia para PcD", excerpt: "Um guia completo sobre seus direitos desde a contratação.", author: "Ricardo", date: "25 Fev", readTime: "10 min", category: "Direitos" },
    { id: 6, title: "Como criar um currículo acessível", excerpt: "Aprenda a destacar suas habilidades de forma clara.", author: "Maria", date: "20 Fev", readTime: "4 min", category: "Carreira" },
    // Página 2
    { id: 7, title: "A importância da acessibilidade digital", excerpt: "Por que sua empresa deve investir em sites acessíveis hoje.", author: "Lucas", date: "15 Fev", readTime: "6 min", category: "Tecnologia" },
    { id: 8, title: "Saúde mental no ambiente corporativo", excerpt: "Dicas para manter o equilíbrio e bem-estar na rotina.", author: "Beatriz", date: "12 Fev", readTime: "7 min", category: "Carreira" },
    { id: 9, title: "Inclusão além das cotas", excerpt: "Como criar uma cultura organizacional verdadeiramente inclusiva.", author: "Equipe", date: "10 Fev", readTime: "9 min", category: "Mercado" },
    { id: 10, title: "Libras no ambiente de trabalho", excerpt: "A importância da comunicação para a inclusão de surdos.", author: "Fernanda", date: "05 Fev", readTime: "5 min", category: "Direitos" },
    { id: 11, title: "Empreendedorismo e Deficiência", excerpt: "Histórias de quem abriu o próprio negócio e venceu barreiras.", author: "Roberto", date: "02 Fev", readTime: "8 min", category: "Histórias" },
    { id: 12, title: "Adaptação de postos de trabalho", excerpt: "O que diz a norma técnica sobre ergonomia e acessibilidade.", author: "Paulo", date: "30 Jan", readTime: "12 min", category: "Legislação" }
];

let paginaAtual = 1;
const itensPorPagina = 6;

function renderizarBlog() {
    const container = document.getElementById('listaPosts');
    const secaoDestaque = document.getElementById('secao-destaque');
    
    // Gerencia o Destaque: Só aparece na página 1
    if (paginaAtual === 1) {
        secaoDestaque.style.display = "block";
        const d = postsData[0];
        document.getElementById('post-destaque').innerHTML = `
            <div class="featured-card row g-0">
                <div class="col-lg-6 featured-img-area">
                    <i class="fa-regular fa-image fa-4x"></i>
                </div>
                <div class="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center">
                    <span class="category-badge mb-3">${d.category}</span>
                    <h3 class="fw-bold h2">${d.title}</h3>
                    <p class="text-muted">${d.excerpt}</p>
                    <button class="btn btn-primary w-fit" style="width:fit-content">Ler Artigo Completo</button>
                </div>
            </div>
        `;
    } else {
        secaoDestaque.style.display = "none";
    }

    // Renderiza os 6 cards da página atual
    container.innerHTML = '';
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const postsExibidos = postsData.slice(inicio, inicio + itensPorPagina);

    container.innerHTML = postsExibidos.map(post => `
        <div class="col-md-6">
            <div class="card post-card shadow-sm border p-3">
                <div class="card-body d-flex flex-column p-0">
                    <span class="category-badge mb-2">${post.category}</span>
                    <h4 class="h5 fw-bold mb-2">${post.title}</h4>
                    <p class="text-muted small mb-3 flex-grow-1">${post.excerpt}</p>
                    <div class="d-flex justify-content-between border-top pt-3 text-muted small">
                        <span><i class="fa-regular fa-calendar me-1"></i>${post.date}</span>
                        <span><i class="fa-regular fa-clock me-1"></i>${post.readTime}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    atualizarPaginacao();
}

function atualizarPaginacao() {
    const total = Math.ceil(postsData.length / itensPorPagina);
    document.getElementById('info-pagina-blog').innerText = `Página ${paginaAtual} de ${total}`;
    document.getElementById('btn-prev').classList.toggle('disabled', paginaAtual === 1);
    document.getElementById('btn-next').classList.toggle('disabled', paginaAtual === total);
}

window.mudarPaginaBlog = function(direcao) {
    paginaAtual += direcao;
    renderizarBlog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.addEventListener('DOMContentLoaded', renderizarBlog);