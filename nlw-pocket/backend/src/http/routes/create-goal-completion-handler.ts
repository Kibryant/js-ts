import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletionSchema } from '../../lib/schema'
import { createGoalCompletion } from '../../use-cases/create-goal-completion'

export const createGoalCompletionHandler: FastifyPluginAsyncZod = async app => {
  app.post(
    '/create-goal-completions',
    {
      schema: {
        body: createGoalCompletionSchema,
      },
    },
    async request => {
      const { goalId } = request.body

      await createGoalCompletion({
        goalId,
      })
    }
  )
}
