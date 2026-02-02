import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getDashboardCard = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getDashboardCard();
    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getManageUsers = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const result = await adminService.getManageUsers(filters);
    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookingManagement = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const result = await adminService.getBookingManagement(filters);
    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllEarningChart = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllEarningChart();
    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRole = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const email = user.email
    const role = user.role
    const result = await adminService.updateRole(email, role)
    res.status(200).json({
      success: true,
      message: "Role update",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const adminController = {
  getDashboardCard,
  getBookingManagement,
  getAllEarningChart,
  getManageUsers,
  updateRole,
};
