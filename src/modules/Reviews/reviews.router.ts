import express, { Router } from "express"
import { reviewsController } from "./reviews.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../type";

const router = express.Router()

router.post('/',auth(UserRole.TUTOR, UserRole.STUDENT), reviewsController.postReview)

router.get('/', reviewsController.getReview)

router.get('/:id', reviewsController.getReviewByID)

router.patch('/replay',auth(UserRole.TUTOR), reviewsController.reviewReplay)

export const reviewsRouter: Router = router;