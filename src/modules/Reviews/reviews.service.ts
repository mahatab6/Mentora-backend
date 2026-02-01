import { Review } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const postReview = async (payload: Omit<Review, "id" | "createdAt" | "replyContent">, id:string) => {
    const result = await prisma.review.create({
        data: {
            ...payload,
            student_id: id
        }
    })
    return result;
}

const getReview = async () => {
    const result = await prisma.review.findMany({
        include: {
            tutor: {
                select: {
                    fullName: true,
                    photoUrl: true
                }
            },
            student: {
                select:{
                    name: true,
                    image: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return result;
}

const getReviewByID = async (id: string) => {
  const result = await prisma.review.findMany({
    where: {
      OR: [
        { student_id: id },
        { tutor_id: id }
      ]
    },
    include: {
      tutor: {
        select: {
          fullName: true,
          photoUrl: true
        }
      },
      student: {
        select: {
          name: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  
  return result;
}

export const reviewsService = {
    postReview,
    getReview,
    getReviewByID
}