import ErroBase from "./ErroBase.js";

class ErroRequisicaoIncorreta extends ErroBase {
    constructor(messagem = "Requisição Incorreta") {
        super(messagem, 400);
    }
}

export default ErroRequisicaoIncorreta;
