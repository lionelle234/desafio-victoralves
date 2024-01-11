import { error } from "console"
import prismaClient from "../prisma"
import exp from "constants"


interface DeleteResultProps{
    id: string
}

class DeleteResultService{
    async execute({ id }: DeleteResultProps){
        if (!id){
            throw new Error("Invalido")
        }

        const findResult = await prismaClient.result.findFirst({
            where:{
                id: id
            }
        })

        if(!findResult){
            throw new Error("Nao existe")
        }
        
        await prismaClient.result.delete({
            where:{
                id: findResult.id
            }
        })

        return { message: "Deletado"}
    }
}

export { DeleteResultService }