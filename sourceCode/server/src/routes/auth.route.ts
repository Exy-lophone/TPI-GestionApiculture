import express from "express"
import { authController } from "../controllers"
import { verifyToken } from "../middlewares"
import { status } from "../utils"
export const authRouter = express.Router()

authRouter
    .get('/verify',verifyToken,(req,res) => res.status(status.OK).json(req.body))
    .post('/register', authController.register)
    .post('/login', authController.login)