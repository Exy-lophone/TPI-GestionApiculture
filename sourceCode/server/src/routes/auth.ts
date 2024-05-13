import express from "express"
import { authController } from "../controllers"

export const authRouter = express.Router()

authRouter
    .post('/register', authController.register)
    .post('/login', authController.login)

// router.get('/verify',verifyToken,(req,res,next) => res.status(status.OK).json({authentication: true}))