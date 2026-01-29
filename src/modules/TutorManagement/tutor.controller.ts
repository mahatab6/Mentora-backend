import { Request, Response } from "express";
import { tutorService } from "./tutor.service";


const postManageprofile = async (req:Request, res:Response) => {
    try {
        const result = await tutorService.postManageprofile
    } catch (error) {
        
    }
}



export const tutorController = {
    postManageprofile
}