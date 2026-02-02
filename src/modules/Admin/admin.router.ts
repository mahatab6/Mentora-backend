import express, { Router } from "express"
import { adminController } from "./admin.controller";

const router = express.Router()

router.get('/dashboard-card', adminController.getDashboardCard)

router.get('/booking-management', adminController.getBookingManagement)

router.get('/all-earning-chart', adminController.getAllEarningChart)

export const adminRouter: Router = router;