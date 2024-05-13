import express from "express"
import { couleurController } from "../controllers"

export const couleurRouter = express.Router()

couleurRouter.route('/')
    .get(couleurController.getAll)
    .post(couleurController.create)
    
couleurRouter.route('/:id')
    .get(couleurController.getById)
    .delete(couleurController.deleteById)