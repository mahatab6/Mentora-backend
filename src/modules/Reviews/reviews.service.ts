import { Review } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const Postreview = async (payload: Omit<Review, "id" | "createdAt" | "replyContent">, id:string) => {
    const result = await prisma.review.create({
        data: {
            ...payload,
            student_id: id
        }
    })
    return result;
}

export const reviewsService = {
    Postreview
}