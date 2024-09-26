import { env } from './src/lib/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema',
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRESQL_URL,
  },
})
