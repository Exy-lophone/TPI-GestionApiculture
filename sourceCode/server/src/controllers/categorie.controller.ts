import { asyncHandler, status, config, type ErrorStatus } from '../utils'
import { categorieDB } from '../database'
import { categorieParser, idParser } from '../validation'

const create = asyncHandler(async (req, res) => {
    const categorie = categorieParser.parse(req.body)
    const categorieRecord = await categorieDB.create(categorie)
    res.status(status.OK_CREATED).json(categorieRecord)
})

const getAll = asyncHandler(async (req, res) => {
    const categories = await categorieDB.getAll()
    res.status(status.OK).json(categories)
})

const getById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const categorieRecord = await categorieDB.getById(id)
    if(!categorieRecord) {
        const err: ErrorStatus = {
            status: status.BAD_REQUEST,
            message: `Categorie with id: ${id} do not exist`
        }
        throw err
    }
    res.status(status.OK).json(categorieRecord)
})

const deleteById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const categorieRecord = await categorieDB.deleteById(id)
    res.status(status.OK).json(categorieRecord)
})

export const categorieController = {
    create,
    getAll,
    getById,
    deleteById
}