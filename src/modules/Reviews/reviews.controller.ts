import { Request, Response } from "express";
import { reviewsService } from "./reviews.service";

const Postreview = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const result = await reviewsService.Postreview(req.body, id as string);
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

export const reviewsController = {
  Postreview,
};
