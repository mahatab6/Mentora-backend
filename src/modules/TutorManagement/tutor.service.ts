import { Tutor, tutorAvailability } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { AvailabilityDTO } from "../../type";



const postManageprofile = async (data:Omit<Tutor,"id" | "tutor_id" | "createdAt" | "updatedAt" | "totalLessons" | "averageRating" | "totalReviews">, id:string) =>{
    
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

const getAllTutor = async (filters: any) => {
  const { search, subject, price, rating, page = "1", limit = "10" } = filters;
  const skip = (Number(page) - 1) * Number(limit);
  const whereConditions: any = {};

  if (search) {
    whereConditions.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { shortBio: { contains: search, mode: 'insensitive' } },
    ];
  }


  if (subject && subject !== 'all') {
    whereConditions.subjects = {
      has: subject
    };
  }
  if (price && price !== 'all') {
    if (price.includes('-')) {
      const [min, max] = price.split('-').map(Number);
      whereConditions.hourlyRate = { gte: min, lte: max };
    } else if (price.includes('+')) {
      const min = Number(price.replace('+', ''));
      whereConditions.hourlyRate = { gte: min };
    }
  }

  if (rating && rating !== 'all') {
    const minRating = parseFloat(rating.replace('+', ''));
    whereConditions.rating = { gte: minRating };
  }

  const [result, total] = await Promise.all([
    prisma.tutor.findMany({
      where: whereConditions,
      skip: skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    }),
    prisma.tutor.count({ where: whereConditions })
  ]);

  return {
    tutors: result,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    }
}
}

const getUniqueTutor = async (id: string) => {
    const result = await prisma.tutor.findUnique({
        where: {
            tutor_id: id
        }
    })
    return result;
}



const postManageAvailability = async (
  data:AvailabilityDTO,
  id: string
) => {
  const payload = data.hours.map((hour) => ({
    tutor_id: id,
    date: new Date(data.date),
    hour,
    status: "available",
  }));

  const result = await prisma.tutorAvailability.createMany({
    data: payload,
  });

  return result
};


const getAvailability = async (id: string) => {
  const result = await prisma.tutorAvailability.findMany({
    where: {
      tutor_id: id
    }
  })
  return result;
};



export const tutorService = {
    postManageprofile,
    getAllTutor,
    getUniqueTutor,
    postManageAvailability,
    getAvailability
}