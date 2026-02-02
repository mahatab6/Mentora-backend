import express, { Router } from "express"
import { adminController } from "./admin.controller";

const router = express.Router()

router.get('/dashboard-card', adminController.getDashboardCard)

export const adminRouter: Router = router;