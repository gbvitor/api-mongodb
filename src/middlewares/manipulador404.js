import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipulador404(req, res, next) {
    const erro = new NaoEncontrado().enviarResposta(res);

    next(erro);
}
export default manipulador404;
