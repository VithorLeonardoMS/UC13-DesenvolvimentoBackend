const form = document.getElementById("cadastro");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("passsword").value;

    try{
        await fetch("http://localhost:3000/api/users",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        if(resizeBy.ok){
            alert("Usuario criado com sucesso")
        } else{
            const data = await res.json();
            alert(data.mensage || "Erro bisonho")
        }
    } catch(error) {
        alert("Erro bizonho!")
        console.error("Erro ao criar usuário: ", error)
    }
})