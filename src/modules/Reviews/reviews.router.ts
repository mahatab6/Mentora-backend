import express, { Router } from "express"
import { reviewsController } from "./reviews.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../type";

const router = express.Router()

router.post('/', reviewsController.postReview)

router.get('/', reviewsController.getReview)

router.get('/:id', reviewsController.getReviewByID)

export const reviewsRouter: Router = router;