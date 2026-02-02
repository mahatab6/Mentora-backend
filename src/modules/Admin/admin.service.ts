import { prisma } from "../../lib/prisma";

const getDashboardCard = async () => {
  const totalRevenue = await prisma.booking.aggregate({
    where: {
      status: "completed",
    },
    _sum: {
      price: true,
    },
  });

  const totalBookings = await prisma.booking.aggregate({
    _count: {
      studentId: true,
    },
  });

  const activeUsers = await prisma.user.aggregate({
    where: {
      role: "STUDENT",
    },
    _count: {
      role: true,
    },
  });

  const completedSessions = await prisma.booking.aggregate({
    where: {
      status: "completed",
    },
    _count: {
      studentId: true,
    },
  });

  return {
    totalRevenue: totalRevenue._sum.price || 0,
    totalBookings: totalBookings._count.studentId || 0,
    activeUsers: activeUsers._count.role || 0,
    completedSessions: completedSessions._count.studentId || 0,
  };
};

const getBookingManagement = async (filters: any) => {
  const { search, status, page = "1", limit = "10" } = filters;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  let whereConditions: any = {};

  const andConditions = [];

  if (search) {
    andConditions.push({ id: Number(search) || 0 });
  }

  if (status && status !== "all") {
    andConditions.push({ status: status });
  }


  if (andConditions.length > 0) {
    whereConditions = { AND: andConditions };
  }

  
  const [result, total] = await Promise.all([
    prisma.booking.findMany({
      where: whereConditions,
      skip: skip,
      take: take,
      orderBy: { createdAt: "desc" },
      include: {
        student : {
          select: {
            name: true
          }
        },
        tutor: {
          select: {
            fullName: true
          }
        }
      }

      
    }),
    prisma.booking.count({ where: whereConditions }),
  ]);

  return {
    bookings: result, 
    meta: {
      total,
      page: Number(page),
      limit: take,
      totalPages: Math.ceil(total / take),
    },
  };
};

const getAllEarningChart = async () => {
const bookings = await prisma.booking.findMany({
    where: {
      status: "completed",
    },
    select: {
      price: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return bookings
}

export const adminService = {
  getDashboardCard,
  getBookingManagement,
  getAllEarningChart
};
