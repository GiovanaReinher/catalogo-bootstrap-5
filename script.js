const CATALOG_ITEMS = [
    {
        id: 1,
        titulo: "O mistério da Floresta Negra",
        categoria: "Livros",
        detalhes: "Um romance policiais envolvente que se passa nas profundezas da Floresta Negra",
        preco: "R$ 49,90",
        estoque: 15,
        autor: "Ana Clara Silva",
        lancamento: "2024"
    },
    {
        id: 2,
        titulo: "Vaso de cerâmica Rústica",
        categoria: "Artesanato",
        detalhes: "Vaso decorativo, feito e pintado a mão, ideal para flores secas ou como peça central em mesas. Cada peça única. Cor roxa vibrante com detalhes de ouro velho",
        preco: "R$ 120,00",
        estoque: 3,
        material: "Argila Queimada e Tinta Acrílica",
        dimensoes: "20cm x 15cm"
    },
    {
        id: 3,
        titulo: "Crônicas de Marte",
        categoria: "Livros",
        detalhes: "Clássicos da ficção científica que explora a colonização humana em Marte e seua dilemas éticos. Uma leitura obrigatória para fãs de gênero.",
        preco: "R$ 35,50",
        estoque: 22,
        autor: "Roberto Almeida",
        lancamento: "1998 (Edição comemorativa)"
    },
    {
        id: 4,
        titulo: "Colar de Semente Natural",
        categoria: "Artesanato",
        detalhes: "Colar sustentável feito com sementes de açaí e tucumã. Perfeito para um visual boêmio e natural. Fecho ajustável. ",
        preco: "R$75,90",
        estoque: 8,
        material: "Semente Naturais e Fio Encerada",
        comprimento: "50cm"
    }
];

const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');
const modalAction = modalElement.querySelector('.btn-success');

modalElement.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttribute('data-item-id'));
    const item = CATALOG_ITEMS.find(i => i.id === itemId);

    if (item) {
        //atualiza o titulo do modal
        modalTitle.textContent = item.titulo;

        let detailsHTML = `
        <p class="mb-1"><strong>Categoria:</strong> <span class="badge bg-secondary">${item.categoria}</span></p>
        <p class="fs-4 fw-bold text-success mb-3">Preço: ${item.preco}</p>
        <hr>
        <p>${item.detalhes}</p>
        `;

        //adiciona campos especificos por categoria
        if (item.categoria === 'Livros') {
            detailsHTML += `<p><strong>Autor:</strong> ${item.autor}</p>`;
            detailsHTML += `<p><strong>Lançamento:</strong> ${item.lancamento}</p>`;
            detailsHTML += `<p class="text-info"><strong>Estoque Disponivel:</strong> ${item.estoque} unidades</p>`;
        } else if (item.categoria === 'Artesanato') {
            detailsHTML += `<p><strong>Material:</strong> ${item.material}</p>`;
            detailsHTML += `<p><strong>Dimensoes/comprimento:</strong> ${item.dimensoes || item.comprimento}</p>`;
            detailsHTML += `<p class="text-info"><strong>Peças Exclusivas em Estoque:</strong> ${item.estoque}</p>`;
        }
        modalBody.innerHTML = detailsHTML;

        //ao clicar no botão "adicionar ao carrinho"
        modalAction.onclick = () => {
            console.log(`ação: item '${item.titulo}'  (ID: ${item.id}) adiciona ao carrinho.`);
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if(bsModal) bsModal.hide();
        };
    }
});

//2.ouvinte para a funcionalidade de busca (simples)
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const items = document.querySelectorAll('.item-catalogo');

function executarPesquisa(event) {
    event.preventDefault();
    const query = searchInput.value.toLowerCase().trim();
    items.forEach(item => {
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const category = item.getAttribute('data-categoria').toLowerCase();

         if (title.includes(query) || category.includes(query) || query === "") {
            item.style.display = "block";
         } else {
            item.style.display = 'none';
         }
    });

}

searchButton.addEventListener('click', executarPesquisa);
searchInput.addEventListener('keyup',(event) => {
    if (event.key === 'Enter') {
        executarPesquisa(event);
    } else if (searchInput.value.trim() === "") {
        executarPesquisa(event);
    }
});

items.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('.card-title');
    const category = card.querySelectorAll('.card-text')[0];
    const description = card.querySelectorAll('.card-text')[1];

    const item = CATALOG_ITEMS.find(i => i.id === (index + 1));

    if (item) {
        img.src = img.src.replace(/\?text=(.*)/, "?text=" + item.categoria.toUpperCase());
        
        title.textContent = item.titulo;
        
        category.textContent = "Categoria: " + item.categoria;
        description.textContent = item.detalhes;
        
    }
});