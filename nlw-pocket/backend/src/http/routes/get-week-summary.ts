import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../use-cases/get-week-summary'

export const getWeekSummaryHandler: FastifyPluginAsyncZod = async app => {
  app.get('/week-summary', async () => {
    const { summary } = await getWeekSummary()

    return { summary }
  })
}
