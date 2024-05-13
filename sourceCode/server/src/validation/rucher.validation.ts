import { z } from 'zod'

export const rucherParser = z.object({
    nbr: z.number(),
    name: z.string(),
    localisation: z.string(),
    fkApiculteur: z.number(),
})

export const rucherPartialParser = rucherParser.partial()

export type Rucher = z.infer<typeof rucherParser>

export type RucherPartial = z.infer<typeof rucherPartialParser>