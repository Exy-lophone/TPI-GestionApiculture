import { z } from 'zod'

export const loginParser = z.object({
    token: z.string(),
    userId: z.number()
})

export const rucherParser = z.object({
    idRucher: z.number(),
    rucNumero: z.number(),
    rucNom: z.string(),
    rucLocalisation: z.string(),
    fkApiculteur: z.number()
})

export type Rucher = z.infer<typeof rucherParser>

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

export type Ruche = z.infer<typeof rucheParser>

export const activityParser = z.object({
    idActivite: z.number(),
    actDescription: z.string(),
    actDate: z.string().datetime(),
    actDuree: z.string().datetime(),
    categorie: z.object({
        idCategorie: z.number(),
        catNom: z.string()
    }),
    ruches: rucheParser
})

export type Activity = z.infer<typeof activityParser>

export const categoryParser = z.object({
    idCategorie: z.number(),
    catNom: z.string()
})

export type Category = z.infer<typeof categoryParser>