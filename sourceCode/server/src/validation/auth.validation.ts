import { z } from 'zod'

export const loginParser = z.object({
    username: z.string(),
    password: z.string(),
})