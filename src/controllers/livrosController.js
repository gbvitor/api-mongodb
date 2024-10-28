import { livros } from "../models/index.js"; // Importa o modelo de livro

class LivroController {
    // Método estático para listar todos os livros
    static listarLivros = async (req, res, next) => {
        try {
            const livrosResultado = await livros
                .find()
                .populate("autor")
                .exec(); // Popula os autores
            res.status(200).json(livrosResultado); // Retorna a lista de livros
        } catch (erro) {
            next(erro); // Passa o erro para o middleware de tratamento
        }
    };

    // Método estático para listar um livro específico pelo ID
    static listarLivroPorId = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID da requisição
            const livroResultado = await livros
                .findById(id)
                .populate("autor", "nome")
                .exec(); // Busca o livro

            if (!livroResultado) {
                return res
                    .status(404)
                    .json({ message: "Livro não localizado." }); // Resposta 404 se não encontrado
            }

            res.status(200).json(livroResultado); // Retorna o livro encontrado
        } catch (erro) {
            next(erro); // Passa o erro para o middleware de tratamento
        }
    };

    // Método estático para cadastrar um novo livro
    static cadastrarLivro = async (req, res, next) => {
        try {
            const livro = new livros(req.body); // Cria nova instância do livro
            const livroResultado = await livro.save(); // Salva o novo livro
            res.status(201).json(livroResultado); // Retorna o livro cadastrado
        } catch (erro) {
            next(erro); // Passa o erro para o middleware de tratamento
        }
    };

    // Método estático para atualizar um livro existente
    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID da requisição
            const livroAtualizado = await livros.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            ); // Atualiza o livro

            if (!livroAtualizado) {
                return res
                    .status(404)
                    .json({ message: "Livro não encontrado." }); // Resposta 404 se não encontrado
            }

            res.status(200).json({
                message: "Livro atualizado com sucesso",
                livro: livroAtualizado,
            }); // Retorna mensagem de sucesso
        } catch (erro) {
            next(erro); // Passa o erro para o middleware de tratamento
        }
    };

    // Método estático para excluir um livro
    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID da requisição
            const livroRemovido = await livros.findByIdAndDelete(id); // Tenta excluir o livro

            if (!livroRemovido) {
                return res
                    .status(404)
                    .json({ message: "Livro não encontrado." }); // Resposta 404 se não encontrado
            }

            res.status(200).json({ message: "Livro removido com sucesso" }); // Retorna mensagem de sucesso
        } catch (erro) {
            next(erro); // Passa o erro para o middleware de tratamento
        }
    };

    // Método estático para listar livros por filtro
    static listarLivroPorFiltro = async (req, res, next) => {
        try {
            const { editora, titulo } = req.query;
            // Verifica os parâmetros ausentes usando a função auxiliar

            // Se houver parâmetros ausentes, retorna a mensagem de erro
            if (faltandoParametros.length > 0) {
                return res.status(400).json({
                    message: `Parâmetro(s) ausente(s): ${faltandoParametros.join(
                        ", "
                    )}`,
                });
            }

            const livrosResultado = await livros.find({ editora, titulo }); // Busca os livros pela editora
            res.status(200).json(livrosResultado); // Retorna a lista de livros
        } catch (erro) {
            next(erro); // Passa o erro para o middleware de tratamento
        }
    };
}

export default LivroController; // Exporta a classe LivroController
