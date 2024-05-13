import { z } from 'zod'

export const couleurParser = z.object({
    name: z.string(),
    hexCode: z.string().regex(/[A-F|0-9]{6}/i)
})

export type Couleur = z.infer<typeof couleurParser>
