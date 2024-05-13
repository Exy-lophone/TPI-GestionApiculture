import { prisma } from "../../prisma";
import type { Categorie } from '../validation'

const create = async (categorie: Categorie) => {
    return await prisma.t_categorie.create({
        data: {
            catNom: categorie.name
        }
    })
}

const getAll = async () => {
    return await prisma.t_categorie.findMany()
}

const getById = async (id: number) => {
    return await prisma.t_categorie.findUnique({
        where: {
            idCategorie: id
        }
    })
}

const deleteById = async (id: number) => {
    return await prisma.t_categorie.delete({
        where: {
            idCategorie: id
        }
    })
}

export const categorieDB = {
    create,
    getAll,
    getById,
    deleteById
}