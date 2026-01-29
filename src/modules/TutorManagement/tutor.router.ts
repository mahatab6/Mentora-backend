import express, { Router } from "express"
import { tutorController } from "./tutor.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../type";



const router = express.Router()

router.get("/", tutorController.getAllTutor)

router.get("/:id", tutorController.getUniqueTutor)

router.post("/manage-profile",auth(UserRole.TUTOR), tutorController.postManageprofile)


export const tutorRouter: Router = router;