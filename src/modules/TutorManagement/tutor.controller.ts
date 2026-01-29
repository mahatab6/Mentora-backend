import { Request, Response } from "express";
import { tutorService } from "./tutor.service";


const postManageprofile = async (req:Request, res:Response) => {
    try {
        const id = req.user?.id
        const email = req.user?.email
        const result = await tutorService.postManageprofile(req.body)
    } catch (error) {
        
    }
}



export const tutorController = {
    postManageprofile
}