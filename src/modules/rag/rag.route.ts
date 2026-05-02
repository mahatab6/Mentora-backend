import { Router } from "express";
import { RagController } from "./rag.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../type";

const router = Router();

// stats
router.get("/stats", RagController.getStats);

// ingestion
router.post("/ingest-tutors",auth(UserRole.ADMIN), RagController.ingestTutors);
router.post("/ingest-courses",auth(UserRole.ADMIN), RagController.ingestCourses);
router.post("/ingest-reviews",auth(UserRole.ADMIN), RagController.ingestReviews);

// query
router.post("/query", RagController.queryRag);


export const RagRouter = router;