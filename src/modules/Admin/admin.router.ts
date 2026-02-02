import express, { Router } from "express"
import { adminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../type";

const router = express.Router()

router.get('/dashboard-card', adminController.getDashboardCard)

router.get('/booking-management', adminController.getBookingManagement)

router.get('/all-earning-chart', adminController.getAllEarningChart)

router.get('/manage-users', adminController.getManageUsers)

router.patch('/update-role',auth(UserRole.ADMIN), adminController.updateRole)

export const adminRouter: Router = router;