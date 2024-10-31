import mongoose from "mongoose"; // Importa o mongoose para validação de ID
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js"; // Importa o modelo de autor

class AutorController {
    // Método estático para listar todos os autores
    static listarAutores = async (req, res, next) => {
        try {
            const autoresResultado = autores.find();
            req.resultado = autoresResultado;
            next();
        } catch (erro) {
            next(erro);
        }
    };

    // Método estático para listar um autor específico pelo ID
    static listarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID do autor da requisição

            // Verifica se o ID é válido antes de consultar o banco
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ message: "ID inválido" });
            }

            // Busca o autor pelo ID no banco de dados
            const autorResultado = await autores.findById(id);

            // Verifica se o autor foi encontrado
            if (autorResultado) {
                res.status(200).send(autorResultado);
            } else {
                next(new NaoEncontrado("Autor não encontrado"));
            }
        } catch (erro) {
            console.error("Erro ao listar autor por ID:", erro);
            next(erro);
        }
    };

    // Método estático para cadastrar um novo autor
    static cadastrarAutor = async (req, res, next) => {
        try {
            // Cria uma nova instância do autor com os dados da requisição
            const autor = new autores(req.body);
            // Salva o novo autor no banco de dados
            const autorResultado = await autor.save();
            // Retorna o autor cadastrado com status 201 (Created)
            res.status(201).send(autorResultado.toJSON());
        } catch (erro) {
            console.error("Erro ao cadastrar autor:", erro);
            next(erro);
        }
    };

    // Método estático para atualizar um autor existente
    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID do autor da requisição

            // Verifica se o ID é válido antes de consultar o banco
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ message: "ID inválido" });
            }

            // Atualiza o autor pelo ID, setando os novos dados
            const autorAtualizado = await autores.findByIdAndUpdate(
                id,
                { $set: req.body },
                { new: true } // Retorna o documento atualizado
            );

            // Verifica se o autor foi encontrado para atualizar
            if (!autorAtualizado) {
                next(new NaoEncontrado("Autor não encontrado"));
            } else {
                res.status(200).send({
                    message: "Autor atualizado com sucesso",
                    autor: autorAtualizado,
                });
            }
        } catch (erro) {
            console.error("Erro ao atualizar autor:", erro);
            next(erro);
        }
    };

    // Método estático para excluir um autor
    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID do autor da requisição

            // Verifica se o ID é válido antes de consultar o banco
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ message: "ID inválido" });
            }

            // Tenta excluir o autor pelo ID
            const autorRemovido = await autores.findByIdAndDelete(id);

            // Verifica se o autor foi encontrado para remover
            if (!autorRemovido) {
                next(new NaoEncontrado("Autor não encontrado"));
            } else {
                res.status(200).send({ message: "Autor removido com sucesso" });
            }
        } catch (erro) {
            console.error("Erro ao excluir autor:", erro);
            next(erro);
        }
    };
}

export default AutorController;
