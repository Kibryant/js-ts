import z from 'zod'

export const createGoalSchema = z.object({
  title: z.string(),
  desiredWeeklyFrequency: z.number(),
})

export const createGoalCompletionSchema = z.object({
  goalId: z.string(),
})
