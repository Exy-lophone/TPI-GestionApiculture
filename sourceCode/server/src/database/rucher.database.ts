import { prisma } from "../../prisma";

export const rucher = {
    create: async (nbr: number, name: string, localisation: string, idApiculteur: number) => {
        return await prisma.t_rucher.create({
            data: {
                rucNumero: nbr,
                rucNom: name,
                rucLocalisation: localisation,
                fkApiculteur: idApiculteur
            }
        })
    },
    getAll: async () => {
        return await prisma.t_rucher.findMany()
    },
    getById: async (id: number) => {
        return await prisma.t_rucher.findUnique({
            where: {
                idRucher: id
            }
        })
    }
}