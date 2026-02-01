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

router.get('/tutor-metricsgrid/:id',auth(UserRole.TUTOR), tutorController.getMetricsGrid)



export const tutorRouter: Router = router;