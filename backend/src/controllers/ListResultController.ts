import { FastifyRequest, FastifyReply } from "fastify";
import { ListResultService } from "../services/ListResultService";
import { request } from "https";
import { Bimester } from "../types/BimesterType";

class ListResultController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { bimester } = request.query as { bimester: string }
        const listResultService = new ListResultService()

        const results = await listResultService.execute({bimester})

        reply.send(results)

        

    }
}

export { ListResultController }