import { z } from 'zod'

export const couleurParser = z.object({
    name: z.string(),
    hexCode: z.string().regex(/#[A-F|a-f|0-9]{6}/)
})

export type Couleur = z.infer<typeof couleurParser>
