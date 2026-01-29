
import { NextFunction, Request, Response } from "express"

import {auth as betterAuth} from "../lib/auth"
import { UserRole } from "../type"




const auth = (...roles: UserRole[]) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            })

            if(!session){
                return res.status(401).json({
                    success: false,
                    message: "You are not authorie"
                })
            }

            req.user = {
                id: session.user.id,
                email: session.user.email,
            }

            if(!roles.includes(session.user.role as UserRole)){
                return res.status(403).json({
                    success: false,
                    message: "Forbiden you are not permission this url"
                })
            }
            next()
        } catch (error) {
            
        }
    }
}


export default auth;