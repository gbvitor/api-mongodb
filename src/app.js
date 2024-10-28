import express from "express";
import db from "./config/dbConnect.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import routes from "./routes/index.js";

// Adiciona um listener de evento para capturar erros na conexão com o banco de dados
db.on("error", console.log.bind(console, "Erro de conexão"));

// Adiciona um listener de evento que exibe uma mensagem ao conectar com sucesso ao banco de dados
db.once("open", () => {
    console.log("conexão com o banco feita com sucesso");
});

const app = express();

app.use(express.json());

routes(app);

app.use(manipuladorDeErros);

app.use(manipulador404);

export default app;
