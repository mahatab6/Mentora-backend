import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const postReview = async (payload: Omit<Review, "id" | "createdAt" | "replyContent">,) => {


  const result = await prisma.$transaction(async (tx) => {
    const newReview = await tx.review.create({
      data: {
        rating: payload.rating,
        reviewContent: payload.reviewContent,
        tutor_id: payload.tutor_id,
        student_id: payload.student_id,
      },
    });

    const stats = await tx.review.aggregate({
      where: { tutor_id: payload.tutor_id },
      _avg: { rating: true },
      _count: { id: true },
    });

    await tx.tutor.update({
      where: { tutor_id: payload.tutor_id },
      data: {
        averageRating: stats._avg.rating || 0,
        totalReviews: stats._count.id,
      },
    });

    return newReview;
  });

  return result;
};

const getReview = async () => {
  const result = await prisma.review.findMany({
    include: {
      tutor: {
        select: {
          fullName: true,
          photoUrl: true,
        },
      },
      student: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getReviewByID = async (id: string) => {
  const result = await prisma.review.findMany({
    where: {
      OR: [{ student_id: id }, { tutor_id: id }],
    },
    include: {
      tutor: {
        select: {
          fullName: true,
          photoUrl: true,
        },
      },
      student: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const reviewReplay = async (id: number, replay: string) => {
  const result = await prisma.review.update({
      where: {
        id: id
      },
      data: {
        replyContent: replay
      }
  })

  return result
}

export const reviewsService = {
  postReview,
  getReview,
  getReviewByID,
  reviewReplay
};
