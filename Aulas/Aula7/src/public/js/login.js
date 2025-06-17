const form = document.getElementById("login");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const res = await fetch("http://localhost:3000/api/users/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        if(res.ok){
            alert("Usuario logado com sucesso");
        } else{
            const data = await res.json();
            alert(data.message || "Erro ao realizar login!")
        }
    } catch(error) {
        alert("Erro bizonho!");
        console.error("Erro ao criar usuário: ", error)
    }
})