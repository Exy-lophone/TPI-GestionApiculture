import express from "express"
import { authController } from "../controllers"
import { verifyToken } from "../middlewares"
import { status } from "../utils"
export const authRouter = express.Router()

authRouter
    .get('/verify',verifyToken,(req,res,next) => res.status(status.OK_NOCONTENT))
    .post('/register', authController.register)
    .post('/login', authController.login)