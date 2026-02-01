import { Request, Response } from "express";
import { reviewsService } from "./reviews.service";

const postReview = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const result = await reviewsService.postReview(req.body, id as string);
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

const getReview = async (req: Request, res: Response) => {
  try {
    const result = await reviewsService.getReview();
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

const getReviewByID = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const result = await reviewsService.getReviewByID(id as string);
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
  postReview,
  getReview,
  getReviewByID
};
