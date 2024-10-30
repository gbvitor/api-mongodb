import NaoEncontrado from "../erros/NaoEncontrado.js"; // Importa o modelo de livro
import ErroRequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import { autores, livros } from "../models/index.js";

class LivroController {
    // Método estático para listar todos os livros
    static listarLivros = async (req, res, next) => {
        try {
            let { limit = 5, pagina = 1 } = req.query; // Obtém os parâmetros da requisição
            limit = parseInt(limit); // Limite max. de registros por página
            pagina = parseInt(pagina); // Página atual

            if (!limit || !pagina) {
                next(new ErroRequisicaoIncorreta()); // Valida os parâmetros
            } else {
                const livrosResultado = await livros
                    .find()
                    .skip((pagina - 1) * limit)
                    .limit(Number(limit))
                    .populate("autor")
                    .exec(); // Popula os autores
                res.status(200).json(livrosResultado); // Retorna a lista de livros
            }
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
                next(new NaoEncontrado("Livro não encontrado"));
            } else {
                res.status(200).json(livroResultado);
            } // Retorna o livro encontrado}
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
                next(new NaoEncontrado("Livro não encontrado"));
            } else {
                res.status(200).json({
                    message: "Livro atualizado com sucesso",
                    livro: livroAtualizado,
                }); // Retorna mensagem de sucesso
            }
        } catch (erro) {
            next(erro); // Passa o erro para o middleware de tratamento
        }
    };

    // Método estático para excluir um livro
    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID da requisição
            const livroRemovido = await livros.findByIdAndDelete(id);
            // Tenta excluir o livro

            if (!livroRemovido) {
                next(new NaoEncontrado("Livro não encontrado"));
            } else {
                res.status(200).json({ message: "Livro removido com sucesso" }); // Retorna mensagem de sucesso
            }
        } catch (erro) {
            next(erro); // Passa o erro para o middleware de tratamento
        }
    };

    // Método estático para listar livros por filtro
    static listarLivroPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBuasca(req.query); // Processa os parâmetros de busca

            if (Object.keys(busca).length === 0) {
                next(new NaoEncontrado("Filtro inválido"));
            } else {
                const livrosResultado = await livros
                    .find(busca)
                    .populate("autor")
                    .exec();
                res.status(200).json(livrosResultado);
            }
        } catch (erro) {
            next(erro); // Passa o erro para o middleware de tratamento
        }
    };
}

async function processaBuasca(params) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;

    const busca = {};

    if (editora) {
        busca.editora = editora;
    }
    if (titulo) {
        busca.titulo = { $regex: titulo, $options: "i" };
    }
    if (minPaginas || maxPaginas) {
        busca.numeroPaginas = {};

        if (minPaginas) {
            busca.numeroPaginas.$gte = minPaginas;
        }
        if (maxPaginas) {
            busca.numeroPaginas.$lte = maxPaginas;
        }
    }

    if (nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor });
        if (autor) {
            busca.autor = autor._id;
        } else {
            busca.autor = { $exists: false };
            throw new NaoEncontrado("Autor não encontrado");
        }
    }
    return busca;
}

export default LivroController; // Exporta a classe LivroController
