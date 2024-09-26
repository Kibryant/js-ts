import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { goal, goalCompletions } from '../schema'
import { env } from '../../lib/env'

export const client = postgres(env.POSTGRESQL_URL)

export const db = drizzle(client, {
  schema: { goal, goalCompletions },
  logger: true,
})
