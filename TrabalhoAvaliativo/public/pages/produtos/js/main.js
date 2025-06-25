import { criarProdutos } from "./criarProdutos.js";

async function carregarProdutos(){
    try{
        const res = await fetch("http://localhost:3000/api/product",{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
        });
    
        if(res.ok){
            // 
            const products = await res.json();
            criarProdutos(products);
            //
        } else{
            const data = await res.json();
            alert(data.message || "Erro ao realizar login!")
        }
    } catch(error) {
        alert("Erro bizonho!");
        console.error("Erro ao criar usuário: ", error)
    }

}

carregarProdutos();