import express from "express"
import { categorieController } from "../controllers"

export const categorieRouter = express.Router()

categorieRouter.route('/')
    .get(categorieController.getAll)
    .post(categorieController.create)
    
categorieRouter.route('/:id')
    .get(categorieController.getById)
    .delete(categorieController.deleteById)