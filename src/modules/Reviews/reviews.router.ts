import express, { Router } from "express"
import { reviewsController } from "./reviews.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../type";

const router = express.Router()

router.post('/',auth(UserRole.STUDENT), reviewsController.Postreview)

r

export const reviewsRouter: Router = router;