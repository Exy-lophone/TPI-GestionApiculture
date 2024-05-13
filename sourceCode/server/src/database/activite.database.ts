import { prisma } from "../../prisma";
import type { Activite, ActivitePartial } from '../validation/activite.validation'

const create = async (activite: Activite) => {
    return await prisma.t_activite.create({
        data: {
            actDescription: activite.description,
            actDate: activite.dateTime,
            actDuree: activite.dateTime,
            fkCategorie: activite.fkCategorie,
        }
    })
}

const getAll = async () => {
    return await prisma.t_activite.findMany()
}

const getById = async (id: number) => {
    return await prisma.t_activite.findUnique({
        where: {
            idActivite: id
        }
    })
}

const updateById = async(id: number, activite: ActivitePartial) => {
    return await prisma.t_activite.update({
        where: {
            idActivite: id
        },
        data: {
            actDescription: activite.description,
            actDate: activite.dateTime,
            actDuree: activite.dateTime,
            fkCategorie: activite.fkCategorie,
        }
    })
}

const deleteById = async(id: number) => {
    return await prisma.t_activite.delete({
        where: {
            idActivite: id
        }
    })
}

export const activiteDB = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
}