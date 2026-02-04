import { prisma } from "../../lib/prisma"


const updateProfile = async (id: string,  name:string, image:string) => {
    const result = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            name: name,
            image: image
        }
    })
    return result;
}

export const studentService = {
    updateProfile
}