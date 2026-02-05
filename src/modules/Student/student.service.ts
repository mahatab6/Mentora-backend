import { Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const updateProfile = async (id: string, name: string, image: string) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      image: image,
    },
  });
  return result;
};


const updateStatus = async (id: number, status: Status) => {
  const result = await prisma.booking.update({
    where: {
      id: Number(id)
    },
    data: {
      status: status,
    },
  });
  return result;
};

export const studentService = {
  updateProfile,
  updateStatus,
};
