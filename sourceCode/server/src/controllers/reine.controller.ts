import { asyncHandler, status, type ErrorStatus } from '../utils'
import { reineDB } from '../database'
import { reineParser, idParser } from '../validation'

const create = asyncHandler(async (req, res) => {
    const reine = reineParser.parse(req.body)
    const reineRecord = await reineDB.create(reine)
    res.status(status.OK_CREATED).json(reineRecord)
})

const getAll = asyncHandler(async (req, res) => {
    const reines = await reineDB.getAll()
    res.status(status.OK).json(reines)
})

const getById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const reineRecord = await reineDB.getById(id)
    if(!reineRecord) {
        const err: ErrorStatus = {
            status: status.BAD_REQUEST,
            message: `Couleur with id: ${id} do not exist`
        }
        throw err
    }
    res.status(status.OK).json(reineRecord)
})

const deleteById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const reineRecord = await reineDB.deleteById(id)
    res.status(status.OK).json(reineRecord)
})

export const reineController = {
    create,
    getAll,
    getById,
    deleteById
}