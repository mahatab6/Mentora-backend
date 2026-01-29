import express, { Router } from "express"
import { tutorController } from "./tutor.controller";

const router = express.Router()

router.post("/manage-profile", tutorController.postManageprofile)


export const tutorRouter: Router = router;