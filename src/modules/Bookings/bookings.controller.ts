import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const postBooking = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const result = await bookingService.postBooking(req.body, id as string);
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
    const id = req.user?.id;
    const result = await bookingService.getBooking(id as string);
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

export const bookingController = {
  postBooking,
  getBooking,
};
