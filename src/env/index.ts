import { config } from 'dotenv'
import { z } from 'zod'

const ENV_SCHEMA = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(21031),
})

config()

const envValidator = ENV_SCHEMA.safeParse(process.env)

if (!envValidator.success) {
  console.log(`Invalid enviroment`, envValidator.error.format())

  throw new Error(`Invalid enviroment`)
}

export const env = envValidator.data
