
import express, { Router } from "express"
import auth from "../../middleware/auth";
import { UserRole } from "../../type";
import { studentController } from "./student.controller";



const router = express.Router()

router.patch('/',auth(UserRole.STUDENT), studentController.updateProfile)
router.patch('/status',auth(UserRole.STUDENT, UserRole.TUTOR), studentController.updateStatus)

export const studentRouter: Router = router;