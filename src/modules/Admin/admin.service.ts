import { prisma } from "../../lib/prisma"


const getDashboardCard =async () => {
    const totalRevenue = await prisma.booking.aggregate({
        where: {
            status: "completed"
        },
        _sum: {
            price: true
        }
    })
    
    const totalBookings = await prisma.booking.aggregate({
        _count: {
            studentId: true
        }
    })
    
    const activeUsers = await prisma.user.aggregate({
        where: {
            role: "STUDENT"
        },
        _count: {
            role: true
        }
    })

    const completedSessions = await prisma.booking.aggregate({
        where: {
            status: "completed"
        },
        _count: {
            studentId: true
        }
    })

    return {
        totalRevenue: totalRevenue._sum.price || 0,
        totalBookings: totalBookings._count.studentId || 0,
        activeUsers: activeUsers._count.role || 0,
        completedSessions: completedSessions._count.studentId || 0
    };

}


export const adminService = {
    getDashboardCard
}