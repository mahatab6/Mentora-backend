import { Request, Response } from "express";
import { tutorService } from "./tutor.service";

const postManageprofile = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const result = await tutorService.postManageprofile(req.body, id as string);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTutor = async (req: Request, res: Response) => {
  try {
    const filters = req.query;

    const result = await tutorService.getAllTutor(filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUniqueTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await tutorService.getUniqueTutor(id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const postManageAvailability = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const result = await tutorService.postManageAvailability(
      req.body,
      id as string,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await tutorService.getAvailability(id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMetricsGrid = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await tutorService.getMetricsGrid(id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getEarningsChartData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await tutorService.getEarningsChartData(id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await tutorService.getBooking(id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const result = await tutorService.updateProfile(req.body);
    res.status(200).json({
      success: true,
      message: "update your profile",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const updateStatus =async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id)
    const status = req.body.status;
    const result = await tutorService.updateStatus(id as number, status);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const tutorController = {
  postManageprofile,
  getAllTutor,
  getUniqueTutor,
  postManageAvailability,
  getAvailability,
  getMetricsGrid,
  getEarningsChartData,
  getBooking,
  updateProfile,
  updateStatus
};
