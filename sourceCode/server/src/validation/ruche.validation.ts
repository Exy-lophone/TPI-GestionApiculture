import { z } from 'zod'

export const rucheParser = z.object({
    nbr: z.number(),
    description: z.string(),
    fkReine: z.number(),
    fkRucher: z.number(),
    fkCouleur: z.number(),
})

export const ruchePartialParser = rucheParser.partial()

export type Ruche = z.infer<typeof rucheParser>

export type RuchePartial = z.infer<typeof ruchePartialParser>