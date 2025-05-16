import express, { Application, NextFunction, Request, Response} from "express"

const app:Application = express();
const PORT:number = 3000

app.use(express.json())

const porteiroMiddleware = (req:Request, res:Response, next:Function) =>{
    console.log("Requisição recebida em " + req.url);
    next();
}

const dataLog = (req:Request, res:Response, next:NextFunction) => {
    let data:Date = new Date();
    console.log(`Requisição feita em: ${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`);
    next();
}

app.use(porteiroMiddleware);

app.use(dataLog);

app.listen(PORT, () => {console.log(`Servidor rodando em hhtp://localhost:${PORT}`)})

//get ->  Buscar dados
app.get("/",(req:Request,res:Response) => {
    res.send("<h1>Olá mundo!</h1>")
});

app.get("/nome",(req:Request,res:Response) => {
    res.send("<h1> Olá fulano!</h1>")
})

app.get("/sobre",(req:Request,res:Response) => {
    res.status(200).json({ nome: "Vithor", idade: 18, descricao: "Desenvolvedor FullStack, cursando Desenvolvimento de Sistemas"})
})

app.post("/comentarios",(req:Request, res:Response) => {
    const { texto } = req.body;

    if(!texto) {
        res.status(400).json({ mensagem: "Texto é nescesário!" })
        return;
    }

    res.status(201).json({ mensagem: "Comentário recebido!" })
})

app.delete("/comentarios/:id",(req:Request, res:Response)=>{
    const id = req.params.id;
    res.status(204).json({mensagem: "Comentário deletado!"});
    return;
})

app.listen(PORT, () =>{
    console.log("Projeto rodando")
})

