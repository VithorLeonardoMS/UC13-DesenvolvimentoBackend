
function gerarProduto(produto){//Arrumar
    // Cria os elementos
    const section = document.createElement("section");
    section.className = "exibindo-produtos";
    
    const container = document.createElement("div");
    container.className = "container";
    
    // Topo do produto
    const topoProduto = document.createElement("div");
    topoProduto.className = "topo-produto";
    
    const h6Usuario = document.createElement("h6");
    h6Usuario.textContent = "Por:" + (produto.user.email    );
    
    topoProduto.appendChild(h6Usuario);
    
    // Imagem do produto
    const imagemProduto = document.createElement("div");
    imagemProduto.className = "imagem-do-produto";
    
    const img = document.createElement("img");
    img.src = produto.image;
    img.alt = "Imagem do produto";
    
    imagemProduto.appendChild(img);
    
    // Informações do produto
    const infoProduto = document.createElement("div");
    infoProduto.className = "info-produto";
    
    const h3Nome = document.createElement("h3");
    h3Nome.textContent = produto.name;
    
    const pModelo = document.createElement("p");
    pModelo.textContent = produto.model;
    
    const h6Marca = document.createElement("h6");
    h6Marca.textContent = produto.brand;
    
    const pDescricao = document.createElement("p");
    pDescricao.textContent = produto.descripton;
    
    const h4Preco = document.createElement("h4");
    h4Preco.textContent = "R$" + produto.price;
    
    // Adiciona ao info-produto
    infoProduto.appendChild(h3Nome);
    infoProduto.appendChild(pModelo);
    infoProduto.appendChild(h6Marca);
    infoProduto.appendChild(pDescricao);
    infoProduto.appendChild(h4Preco);
    
    // Monta a estrutura final
    container.appendChild(topoProduto);
    container.appendChild(imagemProduto);
    container.appendChild(infoProduto);
    
    section.appendChild(container);
    
    // Insere na página 
    const destino = document.querySelector(".exibicao-produtos");
    destino.appendChild(section);
}

export function gerarProdutos(products){
    products.forEach(produto => {
          gerarProduto(produto)
        });
    
}
