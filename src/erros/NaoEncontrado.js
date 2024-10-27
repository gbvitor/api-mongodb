import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
    constructor(mensagem = "Recurso nao encontrado") {
        super(mensagem, 404);
    }
}

export default NaoEncontrado;
