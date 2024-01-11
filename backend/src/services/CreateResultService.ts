import prismaClient from "../prisma";
import { Bimester } from "../types/BimesterType";
import { Subject } from "../types/SubjectType";
import { Result } from "../types/Result";
import { objectEnumNames, objectEnumValues } from "@prisma/client/runtime/library";



class CreateResultService{
    async execute({ bimester, subject, grade }: Result){
        
        if(!bimester || !subject){
            throw new Error("Preencha todos os campos.")
        }

        if (!(bimester in Bimester) || !(subject in Subject)){
            

            throw new Error("Cheque se os dados estao corretos.")
            

        }

        if (grade){
            if (grade < 0 || grade > 10){
                throw new Error("Nota fora do limite.")
            }
        }

        const users = await prismaClient.result.findMany({
            where: {
              bimester: {
                equals: bimester
              },
              subject: {
                equals: subject
              }
            },
          })
        
        if (users.length > 0){
            throw new Error("Disciplina ja registrada")
            
        }
           
        const result = await prismaClient.result.create({
            data:{
                bimester,
                subject,
                grade
            }
        })


         
        return result

        
    }
}

export { CreateResultService }