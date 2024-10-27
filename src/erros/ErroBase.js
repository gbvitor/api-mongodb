class ErroBase extends Error {
    constructor(mensagem, status) {
        super();
        this.message = mensagem;
        this.status = status;
    }
    enviarResposta(res) {
        res.status(this.status).send({
            message: this.message,
            status: this.status,
        });
    }
}
export default ErroBase;
