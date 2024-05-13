import express from "express"
import { reineController } from "../controllers"

export const reineRouter = express.Router()

reineRouter.route('/')
    .get(reineController.getAll)
    .post(reineController.create)
    
reineRouter.route('/:id')
    .get(reineController.getById)
    .delete(reineController.deleteById)