import express from "express"
import { rucheController } from "../controllers"

export const rucheRouter = express.Router()

rucheRouter.route('/')
    .get(rucheController.getAll)
    .post(rucheController.create)
    
rucheRouter.route('/:id')
    .get(rucheController.getById)
    .patch(rucheController.updateById)
    .delete(rucheController.deleteById)