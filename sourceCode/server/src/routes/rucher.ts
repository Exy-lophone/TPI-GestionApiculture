import express from "express"
import { rucherController } from "../controllers"

export const authRucher = express.Router()

authRucher.route('/')
    .get(rucherController.getAll)
    .post(rucherController.create)
    
authRucher.route('/:id')
    .get(rucherController.getById)
    .patch(rucherController.updateById)
    .delete(rucherController.deleteById)