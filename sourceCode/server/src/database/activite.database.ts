import { prisma } from "../../prisma";
import type { Activite, ActivitePartial } from '../validation/activite.validation'

const select = {
    idActivite: true,
    actDescription: true,
    actDate: true,
    actDuree: true,
    categorie: true
}

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
    return await prisma.t_activite.findMany({ select })
}

const getById = async (id: number) => {
    return await prisma.t_activite.findUnique({
        select,
        where: {
            idActivite: id
        }
    })
}

const getByRucheId = async (id: number) => {
    return await prisma.t_activite.findMany({
        where: {
            ruches: {
                some: {
                    idRuche: id
                }
            }
        },
    })
}

const getByRucherId = async (id: number) => {
    return await prisma.t_activite.findMany({
        where: {
            ruches: {
                some: {
                    fkRucher: id
                }
            }
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
    getByRucheId,
    getByRucherId,
    updateById,
    deleteById,
}