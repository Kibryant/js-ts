import { z } from 'zod'

export const createGoalSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters long'),
  desiredWeeklyFrequency: z.coerce
    .number()
    .min(1, 'Desired weekly frequency must be at least 1')
    .max(7, 'Desired weekly frequency must be at most 7'),
})

export type CreateGoalSchema = z.infer<typeof createGoalSchema>
