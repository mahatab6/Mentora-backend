import { Request, Response } from "express";
import { bookingService } from "./booking.service";


const postBooking = async (req:Request, res: Response) => {
    try {
        const id = req.user?.id
        const result = await bookingService.postBooking(req.body, id as string)
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
// const postBookin = async (req:Request, res: Response) => {

// }


export const bookingController = {
    postBooking
}