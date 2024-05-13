import { prisma } from "../../prisma";
import type { Ruche, RuchePartial } from '../validation'

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
    return await prisma.t_ruche.findMany()
}

const getById = async (id: number) => {
    return await prisma.t_ruche.findUnique({
        where: {
            idRuche: id
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
    updateById,
    deleteById,
}