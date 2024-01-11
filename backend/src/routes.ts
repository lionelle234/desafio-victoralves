import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateResultController } from './controllers/CreateResultController'
import { ListResultController } from "./controllers/ListResultController";
import { DeleteResultController } from "./controllers/DeleteResultController";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){


    //Rota para registrar nota em um bimestre
    fastify.post("/result", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateResultController().handle(request, reply)
    })

    //Rota para mostrar todas as notas registradas
    fastify.get("/list", async(request: FastifyRequest, reply: FastifyReply) =>{
        return new ListResultController().handle(request, reply)
    })

    //Rota para deletar notas
    fastify.delete("/result", async(request: FastifyRequest, reply: FastifyReply) =>{
        return new DeleteResultController().handle(request, reply)
    })
}