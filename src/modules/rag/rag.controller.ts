import { Request, Response } from "express";
import { RagService } from "./rag.service";

const ragService = new RagService();

export class RagController {
  static getStats = async (req: Request, res: Response) => {
    try {
      const result = await ragService.getStats();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  static ingestTutors = async (req: Request, res: Response) => {
    try {
      const result = await ragService.ingestTutors();
      res.status(200).json({ success: true, message: "Tutors indexed", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  static ingestCourses = async (req: Request, res: Response) => {
    try {
      const result = await ragService.ingestCourses();
      res.status(200).json({ success: true, message: "Courses indexed", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  static ingestReviews = async (req: Request, res: Response) => {
    try {
      const result = await ragService.ingestReviews();
      res.status(200).json({ success: true, message: "Reviews indexed", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  static queryRag = async (req: Request, res: Response) => {
    try {
      const { query, topK = 5, sourceType } = req.body;
      const result = await ragService.generateAnswer(query, topK, sourceType);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}