import express from "express"
import { activiteController } from "../controllers"

export const activiteRouter = express.Router()

activiteRouter.route('/year/:year')
    .get(activiteController.getByYear)

activiteRouter.route('/')
    .get(activiteController.getAll)
    .post(activiteController.create)

activiteRouter.route('/:id')
    .get(activiteController.getById)
    .patch(activiteController.updateById)
    .delete(activiteController.deleteById)