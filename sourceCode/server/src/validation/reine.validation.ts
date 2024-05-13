import { z } from 'zod'

export const reineParser = z.object({
    birthYear: z.number().min(1900),
    fkCouleur: z.number(),
})

export type Reine = z.infer<typeof reineParser>
