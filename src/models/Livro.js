import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: { type: String },
    titulo: { type: String, required: [true, "O titulo é obrigatório."] },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores",
        required: [true, "O autor é obrigatório."],
    },
    editora: {
        type: String,
        required: [true, "A editora é obrigatório."],
        enum: {
            values: ["Editora A", "Editora B"],
            message: "A editora {VALUE} não é permitida.",
        },
    },
    numeroPaginas: {
        type: Number,
        validate: {
            validator: function (value) {
                return value > 0 && value <= 5000;
            },
            message: "O número de paginas deve estar entre 0 e 5000.",
        },
    },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;
