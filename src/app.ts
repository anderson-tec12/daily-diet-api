import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { knex } from './database'
import { dietsRoutes } from './routes/diets'

export const app = fastify()

app.register(authRoutes(knex), {
  prefix: 'auth',
})

app.register(dietsRoutes(knex), {
  prefix: 'diets',
})
