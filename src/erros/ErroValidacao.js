import ErroRequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends ErroRequisicaoIncorreta {
    constructor(erro) {
        const messagemErros = Object.values(erro.errors)
            .map((erro) => erro.message)
            .join("; ");

        super(`Um ou mais erros de validação: ${messagemErros} `, 400);
    }
}
export default ErroValidacao;
