import { z } from 'zod'

export const loginParser = z.object({
    token: z.string()
})

export const rucherParser = z.object({
    idRucher: z.number(),
    rucNumero: z.number(),
    rucNom: z.string(),
    rucLocalisation: z.string(),
    fkApiculteur: z.number()
})

export const rucheParser = z.object({
    idRuche: z.number(),
    rucNumero: z.number(),
    rucDescription: z.string(),
    reine: z.object({
        couleur: z.object({
            idCouleur: z.number(),
            couNom: z.string(),
            couCodeHex: z.string(),
        }),
        idReine: z.number(),
        reiAnneNaissance: z.number(),
    }),
    rucher: z.object({
        idRucher: z.number(),
        rucNumero: z.number(),
        rucNom: z.string(),
        rucLocalisation: z.string(),
        fkApiculteur: z.number(),
    }),
    couleur: z.object({
        idCouleur: z.number(),
        couNom: z.string(),
        couCodeHex: z.string(),
    })
})

export const activityParser = z.object({
    idActivite: z.number(),
    actDescription: z.string(),
    actDate: z.string().datetime(),
    actDuree: z.string().datetime(),
    categorie: z.object({
        idCategorie: z.number(),
        catNom: z.string()
    })
})