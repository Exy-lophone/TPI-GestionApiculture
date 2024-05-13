import { prisma } from "../../prisma";
import type { Rucher, RucherPartial } from '../validation'

const create = async (rucher: Rucher) => {
    return await prisma.t_rucher.create({
        data: {
            rucNumero: rucher.nbr,
            rucNom: rucher.name,
            rucLocalisation: rucher.localisation,
            fkApiculteur: rucher.fkApiculteur,
        }
    })
}

const getAll = async () => {
    return await prisma.t_rucher.findMany()
}

const getById = async (id: number) => {
    return await prisma.t_rucher.findUnique({
        where: {
            idRucher: id
        }
    })
}

const updateById = async (id: number, rucher: RucherPartial) => {
    return await prisma.t_rucher.update({
        where: {
            idRucher: id
        },
        data: {
            rucNumero: rucher.nbr,
            rucNom: rucher.name,
            rucLocalisation: rucher.localisation,
            fkApiculteur: rucher.fkApiculteur
        }
    })
}

const deleteById = async (id: number) => {
    return await prisma.t_rucher.delete({
        where: {
            idRucher: id
        }
    })
}

export const rucherDB = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
}