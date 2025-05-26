import express, {Application}  from "express";
import userRoutes from "./routes/UserRoutes"
import { AppDataSource } from "./database/data-source";
import { error } from "console";

const app: Application = express();

app.use(express.json()) //Define uma api


AppDataSource.initialize()
    .then(()=>{
        app.use("./api", userRoutes);

        app.listen(3000,()=>{console.log("Server rodando na porta 3000")})
    })
    .catch((error)=> {console.log(error);})