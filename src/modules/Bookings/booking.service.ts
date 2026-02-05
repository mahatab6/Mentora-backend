import { booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const postBooking = async (payload: Omit<booking, "createdAt">, id: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const newBooking = await tx.booking.create({
      data: {
        startTime: payload.startTime,
        durationMinutes: payload.durationMinutes,
        price: payload.price,
        subject: payload.subject,
        studentId: id,
        status: "upcoming",
        tutorId: payload.tutorId,
      },
    });

    await tx.tutorAvailability.update({
      where: {
        id: payload.id,
      },
      data: { status: "booked" },
    });

    return newBooking;
  });

  return result;
};

const getBooking = async (id: string) => {
  const result = await prisma.booking.findMany({
    where: {
      OR: [{ studentId: id }, { tutorId: id }],
    },
    include: {
      tutor: {
        select: {
          fullName: true,
        },
      },
      student: {
        select: {
          name: true
        }
      }
    },
  });

  const totalSessions = await prisma.booking.count({
    where: {
      OR: [{ studentId: id }, { tutorId: id }],
    },
  });

  const totalSpend = await prisma.booking.aggregate({
    where: {
      OR: [{ studentId: id }, { tutorId: id }],
    },
    _sum: {
      price: true,
    },
  });

  const upcomingSessions = await prisma.booking.count({
    where: {
      OR: [{ studentId: id }, { tutorId: id }],
      status: "upcoming",
    },
  });

  return { result, totalSessions, totalSpend: totalSpend._sum.price ?? 0, upcomingSessions };
};

export const bookingService = {
  postBooking,
  getBooking,
};
