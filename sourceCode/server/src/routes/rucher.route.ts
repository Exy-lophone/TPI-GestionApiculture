import express from "express"
import { rucherController } from "../controllers"

export const rucherRouter = express.Router()

rucherRouter.route('/')
    .get(rucherController.getAll)
    .post(rucherController.create)
    
rucherRouter.route('/:id')
    .get(rucherController.getById)
    .patch(rucherController.updateById)
    .delete(rucherController.deleteById)