import { email } from "better-auth";
import { prisma } from "../../lib/prisma";
import { Category } from "../../../generated/prisma/client";

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

const getManageUsers = async (filters: any) => {
  const { email, role, page = "1", limit = "10" } = filters;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  let whereConditions: any = {};

  const andConditions = [];

  if (email) {
    andConditions.push({email: email});
  }

  if (role && role !== "all") {
    andConditions.push({ role: role });
  }


  if (andConditions.length > 0) {
    whereConditions = { AND: andConditions };
  }

  
  const [result, total] = await Promise.all([
    prisma.user.findMany({
      where: whereConditions,
      skip: skip,
      take: take,
      orderBy: { createdAt: "desc" },

      
    }),
    prisma.user.count({ where: whereConditions }),
  ]);

  return {
    users: result, 
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

const updateCategory = async (id: number, name: string, description: string) => {
  const result = await prisma.category.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description: description,
    },
  });
  return result;
};

const updateRole = async (email:string, role: string) => {
 
  const result = await prisma.user.update({
    where: {
      email: email
    },
    data: {
      role: role
    }
  })
  return result
}

const postCategory = async (payload:Omit<Category, "updatedAt" | "createdAt" | "id">) => {
  const result = await prisma.category.create({
    data: payload
  })

  return result
}

const deleteCategory = async (id: number) => {
  const result = await prisma.category.delete({
    where: {
      id: id
    }
  })

  return result
}


export const adminService = {
  getDashboardCard,
  getBookingManagement,
  getAllEarningChart,
  getManageUsers,
  updateRole,
  postCategory,
  deleteCategory,
  updateCategory
};
