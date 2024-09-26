import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalSchema } from '../../lib/schema'
import { createGoal } from '../../use-cases/create-goal'

export const createGoalHandler: FastifyPluginAsyncZod = async app => {
  app.post(
    '/create-goal',
    {
      schema: {
        body: createGoalSchema,
      },
    },
    async (request, reply) => {
      const { title, desiredWeeklyFrequency } = request.body

      await createGoal({
        title: title,
        desiredWeeklyFrequency: desiredWeeklyFrequency,
      })
    }
  )
}
