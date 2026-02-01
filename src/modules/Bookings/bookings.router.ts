import express, { Router } from "express"
import { bookingController } from "./bookings.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../type";



const router = express.Router()

router.post('/',auth(UserRole.STUDENT), bookingController.postBooking)

router.get('/', auth(UserRole.STUDENT, UserRole.TUTOR), bookingController.getBooking)

export const bookingRouter: Router = router;