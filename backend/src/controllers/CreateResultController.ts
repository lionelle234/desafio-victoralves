import { FastifyRequest, FastifyReply} from 'fastify'
import { CreateResultService } from '../services/CreateResultService'
import { Subject } from '../types/SubjectType'
import { Bimester } from '../types/BimesterType'

class CreateResultController{
    async handle(request: FastifyRequest, reply: FastifyReply){

        const { bimester, subject, grade} = request.body as { bimester: Bimester, subject: Subject, grade: number }

        const resultService = new CreateResultService()

        const result = await resultService.execute({ bimester, subject, grade })

        reply.send(result)


    }
}

export { CreateResultController }