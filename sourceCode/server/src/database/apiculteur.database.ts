import { prisma } from "../../prisma";

export const apiculteur = {
    create: async (username: string, password: string) => {
        return await prisma.t_apiculteur.create({
            data: {
                apiNomUtilisateur: username,
                apiMotDePasse: password,
            }
        })
    },
    getById: async (id: number) => {
        return await prisma.t_apiculteur.findUnique({
            where: {
                idApiculteur: id
            }
        })
    },
    getByUsername: async (username: string) => {
        return await prisma.t_apiculteur.findUnique({
            where: {
                apiNomUtilisateur: username
            }
        })
    }
}