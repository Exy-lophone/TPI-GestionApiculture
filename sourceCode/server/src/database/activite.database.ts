import { prisma } from "../../prisma";
import type { Activite, ActivitePartial } from '../validation/activite.validation'

const select = {
    idActivite: true,
    actDescription: true,
    actDate: true,
    actDuree: true,
    categorie: true,
    ruches: {
        select: {
            idRuche: true,
            rucNumero: true,
            rucDescription: true,
            reine: {
                select: {
                    idReine: true,
                    reiAnneNaissance: true,
                    couleur: true
                }
            },
            rucher: true,
            couleur: true,
        }
    }
}

const createOnRuche = async (activite: Activite) => {
    return await prisma.t_activite.create({
        data: {
            actDescription: activite.description,
            actDate: activite.dateTime,
            actDuree: activite.dateTime,
            fkCategorie: activite.fkCategorie,
            fkRuche: activite.fkRucheOrRucher
        }
    })
}

const createOnRucher = async (activite: Activite) => {
    return await prisma.$transaction(async (tx) => {
        const ids = await tx.t_ruche.findMany({
            select: {
                idRuche: true
            },
            where: {
                fkRucher: activite.fkRucheOrRucher
            }
        })
        const toCreate = ids.map(x => ({
            actDescription: activite.description,
            actDate: activite.dateTime,
            actDuree: activite.dateTime,
            fkCategorie: activite.fkCategorie,
            fkRuche: x.idRuche
        }))
        return await tx.t_activite.createMany({
            data: toCreate
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
                idRuche: id
            }
        },
    })
}

const getByRucherId = async (id: number) => {
    return await prisma.t_activite.findMany({
        select,
        where: {
            ruches: {
                fkRucher: id
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
    createOnRuche,
    createOnRucher,
    getAll,
    getById,
    getByRucheId,
    getByRucherId,
    getByDateRange,
    updateById,
    deleteById,
}