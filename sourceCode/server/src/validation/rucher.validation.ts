import { z } from 'zod'

export const rucherParser = z.object({
    nbr: z.number(),
    name: z.string(),
    localisation: z.string(),
    fkApiculteur: z.number()
})