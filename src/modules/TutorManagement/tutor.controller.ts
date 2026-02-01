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
    const {id} = req.params
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
    const result = await tutorService.postManageAvailability(req.body, id as string);
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
}

const getAvailability = async (req: Request, res: Response) => {
   try {
    const {id} = req.params
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
}




export const tutorController = {
  postManageprofile,
  getAllTutor,
  getUniqueTutor,
  postManageAvailability,
  getAvailability,
};
