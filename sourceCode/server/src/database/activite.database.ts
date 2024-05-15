import { prisma } from "../../prisma";
import type { Activite, ActivitePartial } from '../validation/activite.validation'

const select = {
    idActivite: true,
    actDescription: true,
    actDate: true,
    actDuree: true,
    categorie: true
}

const createAndConnectToRuche = async (activite: Activite) => {
    return await prisma.t_activite.create({
        data: {
            actDescription: activite.description,
            actDate: activite.dateTime,
            actDuree: activite.dateTime,
            fkCategorie: activite.fkCategorie,
            ruches: {
                connect: {
                    idRuche: activite.fkRucheOrRucher
                }
            }
        }
    })
}

const createAndConnectToRucher = async (activite: Activite) => {
    return await prisma.$transaction(async (tx) => {
        const ids = await tx.t_ruche.findMany({
            select: {
                idRuche: true
            },
            where: {
                fkRucher: activite.fkRucheOrRucher
            }
        })
        return await tx.t_activite.create({
            data: {
                actDescription: activite.description,
                actDate: activite.dateTime,
                actDuree: activite.dateTime,
                fkCategorie: activite.fkCategorie,
                ruches: {
                    connect: ids
                }
            }
        })
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
        select,
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
        select,
        where: {
            ruches: {
                some: {
                    fkRucher: id
                }
            }
        }
    })
}

const getByDateRange = async (start: string, end: string) => {
    return await prisma.t_activite.findMany({
        select,
        where: {
            actDate: {
                gte: new Date(start),
                lte: new Date(end),
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
    createAndConnectToRuche,
    createAndConnectToRucher,
    getAll,
    getById,
    getByRucheId,
    getByRucherId,
    getByDateRange,
    updateById,
    deleteById,
}