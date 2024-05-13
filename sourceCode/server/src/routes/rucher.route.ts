import express from "express"
import { rucherController } from "../controllers"

export const rucherRouter = express.Router()

rucherRouter.route('/')
    .get(rucherController.getAll)
    .post(rucherController.create)
    
rucherRouter.route('/:id/ruches')
    .get(rucherController.getAllRuches)

rucherRouter.route('/:id/activites')
    .get(rucherController.getAllActivite)

rucherRouter.route('/:id')
    .get(rucherController.getById)
    .patch(rucherController.updateById)
    .delete(rucherController.deleteById)