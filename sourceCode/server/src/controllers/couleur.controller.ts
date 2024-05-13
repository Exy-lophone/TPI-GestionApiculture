import { asyncHandler, status, type ErrorStatus } from '../utils'
import { couleurDB } from '../database'
import { couleurParser, idParser } from '../validation'

const create = asyncHandler(async (req, res) => {
    const couleur = couleurParser.parse(req.body)
    const couleurRecord = await couleurDB.create(couleur)
    res.status(status.OK_CREATED).json(couleurRecord)
})

const getAll = asyncHandler(async (req, res) => {
    const couleurs = await couleurDB.getAll()
    res.status(status.OK).json(couleurs)
})

const getById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const couleurRecord = await couleurDB.getById(id)
    if(!couleurRecord) {
        const err: ErrorStatus = {
            status: status.BAD_REQUEST,
            message: `Couleur with id: ${id} do not exist`
        }
        throw err
    }
    res.status(status.OK).json(couleurRecord)
})

const deleteById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const couleurRecord = await couleurDB.deleteById(id)
    res.status(status.OK).json(couleurRecord)
})

export const couleurController = {
    create,
    getAll,
    getById,
    deleteById
}