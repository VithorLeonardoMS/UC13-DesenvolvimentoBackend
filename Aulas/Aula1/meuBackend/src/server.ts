import express, { Application, Request, Response} from "express"

const app:Application = express();

app.get("/",(reg:Request,res:Response) => {
    res.send("<h1>Olá mundo!</h1>")
});

app.get("/nome",(reg:Request,res:Response) => {
    res.send("<h1> Olá fulano!</h1>")
})

app.listen(3000, () =>{
    console.log("Projeto rodando")
})