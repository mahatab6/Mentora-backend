import express, { Router } from "express"
import { adminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../type";

const router = express.Router()

router.get('/dashboard-card', adminController.getDashboardCard)

router.get('/booking-management', adminController.getBookingManagement)

router.get('/all-earning-chart', adminController.getAllEarningChart)

router.get('/manage-users', adminController.getManageUsers)

router.post("/create-category",auth(UserRole.ADMIN), adminController.postCategory)

router.delete("/delete-category",auth(UserRole.ADMIN), adminController.deleteCategory)

router.get("/category", adminController.getCategory)

router.patch("/update-category",auth(UserRole.ADMIN), adminController.updateCategory)

router.patch('/update-role',auth(UserRole.ADMIN), adminController.updateRole)

router.patch('/update-status',auth(UserRole.ADMIN), adminController.updateStatus)

export const adminRouter: Router = router;