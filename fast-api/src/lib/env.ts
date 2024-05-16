import { z } from "zod"

const envSchema = z.object({
    UPSTASH_REDIS_REST_URL: z.string(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
  })
  
export const env = envSchema.parse(process.env)