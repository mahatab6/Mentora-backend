import { Tutor } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



const postManageprofile = async (data:Omit<Tutor,"">, id:string) =>{
    
    const existingTutor = await prisma.tutor.findUnique({
        where: {
            tutor_id: id
        }
    })

    if(existingTutor) {
        throw new Error("Tutor profile already exists");
    }
    
    const result = await prisma.tutor.create({
        data: {
            ...data,
            tutor_id: id
        }
    })
    return result;
}


export const tutorService = {
    postManageprofile
}