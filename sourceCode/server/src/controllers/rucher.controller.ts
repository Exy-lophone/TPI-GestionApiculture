import { asyncHandler, status, config, type ErrorStatus } from '../utils'
import { rucherDB } from '../database'
import { rucherParser, rucherPartialParser, idParser } from '../validation'

const create = asyncHandler(async (req, res) => {
    const rucher = rucherParser.parse(req.body)
    const rucherRecord = await rucherDB.create(rucher)
    res.status(status.OK_CREATED).json(rucherRecord)
})

const getAll = asyncHandler(async (req, res) => {
    const ruchers = await rucherDB.getAll()
    res.status(status.OK).json(ruchers)
})

const getById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const rucher = await rucherDB.getById(id)
    if(!rucher) {
        const err: ErrorStatus = {
            status: status.BAD_REQUEST,
            message: `Rucher with id: ${id} do not exist`
        }
        throw err
    }
    res.status(status.OK).json(rucher)
})

const updateById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const rucher = rucherPartialParser.parse(req.body)
    const rucherRecord = await rucherDB.updateById(id, rucher)
    res.status(status.OK).json(rucherRecord)
})

const deleteById = asyncHandler(async (req, res) => {
    const id = idParser.parse(req.params.id)
    const rucherRecord = await rucherDB.deleteById(id)
    res.status(status.OK).json(rucherRecord)
})

export const rucherController = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
}