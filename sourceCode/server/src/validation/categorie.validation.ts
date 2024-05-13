import { z } from 'zod'

export const categorieParser = z.object({
    name: z.string()
})

export type Categorie = z.infer<typeof categorieParser>