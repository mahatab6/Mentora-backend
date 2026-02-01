import { booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const postBooking = async (
  payload: Omit<booking, "createdAt">,
  id: string,
) => {
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
        id: payload.id
      },
      data: { status: "booked" }
    });

    return newBooking
    
  });

  return result;
};

export const bookingService = {
  postBooking,
};
