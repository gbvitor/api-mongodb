import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import ErroRequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
export default function manipuladorDeErros(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
        new ErroRequisicaoIncorreta().enviarResposta(res);
    } else if (erro instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(erro).enviarResposta(res);
    } else if (erro instanceof ErroBase) {
        erro.enviarResposta(res);
    } else {
        new ErroBase("Erro interno", 500).enviarResposta(res);
    }
}
