import { Request, Response } from "express";
import { studentService } from "./student.service";

const updateProfile =async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const name = req.body.name;
    const image = req.body.image
    const result = await studentService.updateProfile(id as string, name as string, image as string);
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

export const studentController = {
    updateProfile
}
