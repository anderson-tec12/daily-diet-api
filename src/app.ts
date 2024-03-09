import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { knex } from './database'

export const app = fastify()

app.register(authRoutes(knex), {
  prefix: 'auth',
})
