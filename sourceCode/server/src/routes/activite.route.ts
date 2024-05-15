import express from "express"
import { activiteController } from "../controllers"

export const activiteRouter = express.Router()

activiteRouter.route('/year/:year')
    .get(activiteController.getByYear)

activiteRouter.route('/onRuche')
    .post(activiteController.createOnRuche)

activiteRouter.route('/onRucher')
    .post(activiteController.createOnRucher)

activiteRouter.route('/')
    .get(activiteController.getAll)

activiteRouter.route('/:id')
    .get(activiteController.getById)
    .patch(activiteController.updateById)
    .delete(activiteController.deleteById)