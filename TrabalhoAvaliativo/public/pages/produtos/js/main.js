import { gerarProdutos } from "./gerarProdutos.js";

async function carregarProdutos(){
    try{
        const res = await fetch("http://localhost:3000/api/product",{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
        });
    
        if(res.ok){
            const products = await res.json();
            gerarProdutos(products);
        } else{
            const data = await res.json();
            alert(data.mensagem || "Erro ao realizar criar produto!")
        }
    } catch(error) {
        alert("Erro bizonho!");
        console.error("Erro ao criar usuário: ", error)
    }

}

carregarProdutos();