import { prisma } from "../../prisma";
import type { Couleur } from '../validation'

const create = async (couleur: Couleur) => {
    return await prisma.t_couleur.create({
        data: {
            couNom: couleur.name,
            couCodeHex: couleur.hexCode,
        }
    })
}

const getAll = async () => {
    return await prisma.t_couleur.findMany()
}

const getById = async (id: number) => {
    return await prisma.t_couleur.findUnique({
        where: {
            idCouleur: id
        }
    })
}

const deleteById = async (id: number) => {
    return await prisma.t_couleur.delete({
        where: {
            idCouleur: id
        }
    })
}

export const couleurDB = {
    create,
    getAll,
    getById,
    deleteById
}