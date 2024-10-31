import ErroRequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
async function paginar(req, res, next) {
    try {
        let { limit = 5, pagina = 1, ordenacao = "_id:-1" } = req.query; // Obtém os parâmetros da requisição

        let [campoOrdenacao, ordem] = ordenacao.split(":");
        // Verifica se os parâmetros são válidos
        limit = parseInt(limit); // Limite max. de registros por página
        pagina = parseInt(pagina); // Página atual
        ordem = parseInt(ordem); // Ordem de ordenação (1 para crescente, -1 para decrescente)

        const resultado = req.resultado; // Obtem o resultado da requisição

        if (!limit || !pagina || !campoOrdenacao || !ordem) {
            next(new ErroRequisicaoIncorreta()); // Valida os parâmetros
        } else {
            const resultadoPaginado = await resultado
                .find()
                .sort({ [campoOrdenacao]: ordem }) // Ordena por título
                .skip((pagina - 1) * limit)
                .limit(Number(limit))
                .exec(); // Popula os autores
            res.status(200).json(resultadoPaginado); // Retorna a lista de livros
        }
    } catch (erro) {
        next(erro); // Passa o erro para o middleware de tratamento
    }
}

export default paginar;
