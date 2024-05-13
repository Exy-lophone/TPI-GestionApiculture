import { z } from 'zod'

export const activiteParser = z.object({
    description: z.string(),
    dateTime: z.string().datetime(),
    fkCategorie: z.number(),
})

export const activitePartialParser = activiteParser.partial()

export type Activite = z.infer<typeof activiteParser>

export type ActivitePartial = z.infer<typeof activitePartialParser>