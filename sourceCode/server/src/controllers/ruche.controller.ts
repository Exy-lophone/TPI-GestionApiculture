import { asyncHandler, status, type ErrorStatus } from '../utils'
import { rucheDB, activiteDB } from '../database'
import { rucheParser, ruchePartialParser, idParser } from '../validation'

const create = asyncHandler(async (req, res) => {
    const ruche = rucheParser.parse(req.body)
    const rucheRecord = await rucheDB.create(ruche)
    res.status(status.OK_CREATED).json(rucheRecord)
})

const getAll = asyncHandler(async (req, res) => {
    const ruchers = await rucheDB.getAll()
    res.status(status.OK).json(ruchers)
})

const getAllActivites = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const activites = await activiteDB.getByRucheId(id)
    res.status(status.OK).json(activites)
})

const getById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const ruche = await rucheDB.getById(id)
    if(!ruche) {
        const err: ErrorStatus = {
            status: status.BAD_REQUEST,
            message: `Rucher with id: ${id} do not exist`
        }
        throw err
    }
    res.status(status.OK).json(ruche)
})

const updateById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const ruche = ruchePartialParser.parse(req.body)
    const rucheRecord = await rucheDB.updateById(id, ruche)
    res.status(status.OK).json(rucheRecord)
})

const deleteById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const rucheRecord = await rucheDB.deleteById(id)
    res.status(status.OK).json(rucheRecord)
})

export const rucheController = {
    create,
    getAll,
    getAllActivites,
    getById,
    updateById,
    deleteById,
}