import { z } from 'zod'

export const idParser = z.coerce.number()