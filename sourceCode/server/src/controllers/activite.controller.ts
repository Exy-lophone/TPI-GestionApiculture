import { asyncHandler, status, config, type ErrorStatus } from '../utils'
import { activiteDB } from '../database'
import { activiteParser, activitePartialParser, idParser } from '../validation'

const create = asyncHandler(async (req, res) => {
    const activite = activiteParser.parse(req.body)
    const activiteRecord = await activiteDB.createAndConnectToRuche(activite)
    res.status(status.OK_CREATED).json(activiteRecord)
})

const getAll = asyncHandler(async (req, res) => {
    const activites = await activiteDB.getAll()
    res.status(status.OK).json(activites)
})

const getById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const activiteRecord = await activiteDB.getById(id)
    if(!activiteRecord) {
        const err: ErrorStatus = {
            status: status.BAD_REQUEST,
            message: `Activite with id: ${id} do not exist`
        }
        throw err
    }
    res.status(status.OK).json(activiteRecord)
})

const getByYear = asyncHandler(async (req, res) => {
    const year = idParser.parse(req.params.year)
    const start = year + "-01-01"
    const end = year + "-12-31"
    const activites = await activiteDB.getByDateRange(start,end)
    res.status(status.OK).json(activites)
})

const updateById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const activite = activitePartialParser.parse(req.body)
    const activiteRecord = await activiteDB.updateById(id, activite)
    res.status(status.OK).json(activiteRecord)
})

const deleteById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const activiteRecord = await activiteDB.deleteById(id)
    res.status(status.OK).json(activiteRecord)
})

export const activiteController = {
    create,
    getAll,
    getById,
    getByYear,
    updateById,
    deleteById,
}