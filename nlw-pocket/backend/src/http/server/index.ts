import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from '../../lib/env'
import { createGoalHandler } from '../routes/create-goal-handler'
import { createGoalCompletionHandler } from '../routes/create-goal-completion-handler'
import { getWeekPendingGoalsHandler } from '../routes/get-week-pending-goals-handler'
import { getWeekSummaryHandler } from '../routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalHandler)
app.register(createGoalCompletionHandler)
app.register(getWeekPendingGoalsHandler)
app.register(getWeekSummaryHandler)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
