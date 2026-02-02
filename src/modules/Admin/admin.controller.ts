import { Request, Response } from "express"
import { adminService } from "./admin.service"


const getDashboardCard =async (req: Request, res: Response) => {
    try {
        const result = await adminService.getDashboardCard()
        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            data: result
        });
    } catch (error: any) {
        res.status(400).json({
      success: false,
      message: error.message,
    });
    }
}

const getBookingManagement =async (req: Request, res: Response) => {
    try {
        const filters = req.query; 
        const result = await adminService.getBookingManagement(filters)
        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            data: result
        });
    } catch (error: any) {
        res.status(400).json({
      success: false,
      message: error.message,
    });
    }
}

const getAllEarningChart =async (req: Request, res: Response) => {
    try {
        const result = await adminService.getAllEarningChart()
        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            data: result
        });
    } catch (error: any) {
        res.status(400).json({
      success: false,
      message: error.message,
    });
    }
}


export const adminController = {
    getDashboardCard,
    getBookingManagement,
    getAllEarningChart
}