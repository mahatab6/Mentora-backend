import express, { Router } from "express"
import { tutorController } from "./tutor.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../type";



const router = express.Router()

router.get("/", tutorController.getAllTutor)

router.get("/availability/:id", tutorController.getAvailability)

router.get("/:id", tutorController.getUniqueTutor)

router.post("/manage-availability",auth(UserRole.TUTOR), tutorController.postManageAvailability)

router.post("/manage-profile",auth(UserRole.TUTOR), tutorController.postManageprofile)

router.get('/tutor-metricsgrid/:id', tutorController.getMetricsGrid)

router.get('/earnings-chart/:id',tutorController.getEarningsChartData)

router.get('/booking/:id',tutorController.getBooking)

router.patch('/tutor-profile-update', tutorController.updateProfile)



export const tutorRouter: Router = router;