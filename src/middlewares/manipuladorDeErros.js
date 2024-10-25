import mongoose from "mongoose";

export default function manipuladorDeErros(erro,res,req,next) {

        if (erro instanceof mongoose.Error.CastError) {
            res.status(400).send({ error: "Um ou mais dados fornecidos estão incorretos" });
        }else {
            res.status(500).send({ message: erro.message });
        }

}