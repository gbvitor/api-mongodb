import mongoose from "mongoose";

export default function manipuladorDeErros(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
        res.status(400).send({
            message: "Um ou mais dados fornecidos estão incorretos",
        });
    } else if (erro instanceof mongoose.Error.ValidationError) {
        const messagemErros = Object.values(erro.errors)
            .map((erro) => erro.message)
            .join("; ");

        res.status(400).send({
            message: `Um ou mais erros de validação: ${messagemErros} `,
        });

        res.status(400).send({ message: "Houve um erro de validação" });
    } else {
        res.status(500).send({ message: "Erro interno do servidor" });
    }
}
