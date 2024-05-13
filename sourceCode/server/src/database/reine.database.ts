import { prisma } from "../../prisma";
import type { Reine } from '../validation'

const select = {
    idReine: true,
    reiAnneNaissance: true,
    couleur: true
}

const create = async (reine: Reine) => {
    return await prisma.t_reine.create({
        data: {
            reiAnneNaissance: reine.birthYear,
            fkCouleur: reine.fkCouleur,
        }
    })
}

const getAll = async () => {
    return await prisma.t_reine.findMany({ select })
}

const getById = async (id: number) => {
    return await prisma.t_reine.findUnique({
        select,
        where: {
            idReine: id
        }
    })
}

const deleteById = async (id: number) => {
    return await prisma.t_reine.delete({
        where: {
            idReine: id
        }
    })
}

export const reineDB = {
    create,
    getAll,
    getById,
    deleteById
}