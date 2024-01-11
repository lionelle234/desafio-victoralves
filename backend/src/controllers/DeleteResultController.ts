import { FastifyRequest, FastifyReply} from 'fastify'
import { DeleteResultService } from '../services/DeleteResultService'

class DeleteResultController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as { id: string }
        const resultService = new DeleteResultService()

        const result = await resultService.execute({ id })

        reply.send(result)
    }
}

export { DeleteResultController }