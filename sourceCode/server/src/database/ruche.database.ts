import { prisma } from "../../prisma";
import type { Ruche, RuchePartial } from '../validation'

const select = {
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

const create = async (ruche: Ruche) => {
    return await prisma.t_ruche.create({
        data: {
            rucNumero: ruche.nbr,
            rucDescription: ruche.description,
            fkReine: ruche.fkReine,
            fkRucher: ruche.fkRucher,
            fkCouleur: ruche.fkCouleur,
        }
    })
}

const getAll = async () => {
    return await prisma.t_ruche.findMany({ select })
}

const getById = async (id: number) => {
    return await prisma.t_ruche.findUnique({
        select,
        where: {
            idRuche: id
        }
    })
}

const getByRucherId = async (id: number) => {
    return await prisma.t_ruche.findMany({
        select,
        where: {
            fkRucher: id
        }
    })
}

const updateById = async (id: number, ruche: RuchePartial) => {
    return await prisma.t_ruche.update({
        where: {
            idRuche: id
        },
        data: {
            rucNumero: ruche.nbr,
            rucDescription: ruche.description,
            fkReine: ruche.fkReine,
            fkRucher: ruche.fkRucher,
            fkCouleur: ruche.fkCouleur,
        }
    })
}

const deleteById = async (id: number) => {
    return await prisma.t_ruche.delete({
        where: {
            idRuche: id
        }
    })
}

export const rucheDB = {
    create,
    getAll,
    getById,
    getByRucherId,
    updateById,
    deleteById,
}