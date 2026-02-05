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

const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id); 
    const name = req.body.name;
    const description = req.body.description;
    const result = await adminService.updateCategory(id, name, description);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const updateRole = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const email = user.email;
    const role = user.role;
    const result = await adminService.updateRole(email, role);
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

const updateStatus = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const email = user.email;
    const status = user.status;
    const result = await adminService.updateStatus(email, status);
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

const postCategory =async (req: Request, res: Response) => {
    try {
    const result = await adminService.postCategory(req.body);
    res.status(200).json({
      success: true,
      message: "category crated",
      data: result,
    });
    } catch (error:any) {
        res.status(400).json({
      success: false,
      message: error.message,
    });
    }
};

const deleteCategory =async (req: Request, res: Response) => {
    try {
    const {id} = req.body
    const result = await adminService.deleteCategory(id as number);
    res.status(200).json({
      success: true,
      message: "delete succesfully",
      data: result,
    });
    } catch (error:any) {
        res.status(400).json({
      success: false,
      message: error.message,
    });
    }
};

const getCategory =async (req: Request, res: Response) => {
    try {
    const result = await adminService.getCategory();
    res.status(200).json({
      success: true,
      message: "get category succesfully",
      data: result,
    });
    } catch (error:any) {
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
  postCategory,
  deleteCategory,
  updateCategory,
  getCategory,
  updateStatus
};
