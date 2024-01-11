import prismaClient from "../prisma";
import { Bimester } from "../types/BimesterType";

interface ResultsProps{
    bimester: string
}

class ListResultService{
    async execute({bimester}: ResultsProps){
        const results = await prismaClient.result.findMany({
            where:{
                bimester: bimester
            }
        })
    
        return results
    }
}

export { ListResultService }