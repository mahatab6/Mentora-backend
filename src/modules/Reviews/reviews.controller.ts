import { Request, Response } from "express";
import { reviewsService } from "./reviews.service";

const postReview = async (req: Request, res: Response) => {
  try {
    const result = await reviewsService.postReview(req.body);
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

const reviewReplay = async (req: Request, res: Response) => {
  try {
    const id = req.body.id
    const replay = req.body.replay
    const result = await reviewsService.reviewReplay(id as number, replay as string);
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
  getReviewByID,
  reviewReplay
};
