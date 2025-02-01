//importando o fastify
import { fastify } from "fastify";
//importando o databaseMemory
import { DatabaseMemory } from "./database-memory.js";
//criando nosso servidor
const server = fastify()
//criando database
const database = new DatabaseMemory()
//lendo um suplemento
server.get('/suplementos', (request) => {
    //pegando a busca
    const search = request.query.search
    //imprimir busca
      console.log(search)
    //Acessando o database
    const suplementos = database.list(search)
      //console.log(suplemento)
    //retornando suplemento
    return suplementos
})
//Criando um suplemento
server.post('/suplemento', (request, reply) => {
    //acessando dados do corpo
    const { tipo, quantidade, marca, preço, peso, proteina } = request.body

    database.create({
        tipo: tipo,
        quantidade: quantidade,
        marca: marca,
        preço: preço,
        peso: peso,
        proteina: proteina,

    })

    //retornando que foi criado
    return reply.status(201).send()
})
//atualizar com PUT (todos os atributos)
server.put('/suplemento/:id', (request, reply) => {
    //passando ID do suplemento
    const suplementoId = request.params.id
    //passando o restante dos atributos
    const { tipo, quantidade, marca, preço, peso, proteina } = request.body
    const suplemento = database.update(suplementoId, {
        tipo,
        quantidade,
        marca,
        preço,
        peso,
        proteina,
    })
    //sucesso sem conteudo
    return reply.status(204).send()
})
//atualizar com PATCH (apenas os atributos necessarios)
server.patch('/suplemento/:id', (request, reply) => {
    const suplementoID = request.params.id
    const update = request.body

    const lvEx = database.getById(suplementoID)
    if (!lvEx) {
        return reply.status(404).send({ message: 'Não encontrei essa disnara' })
    }

    const lvN = { ...lvEx, ...update }

    database.update(suplementoID, lvN)
    return reply.status(204).send()
});
//excluir um registro
server.delete('/suplemento/:id', (request, reply) => {
    const suplementoId = request.params.id
    database.delete(suplementoId)
    return reply.status(204).send()
})
// Definindo a porta que vai rodar
server.listen({
    port: 3333,
})