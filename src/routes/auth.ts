import { FastifyInstance } from 'fastify'
import { Knex } from 'knex'

export function authRoutes(knex: Knex) {
  return async (app: FastifyInstance) => {
    app.get('/', async () => {
      return {
        teste: 'ok',
      }
    })
  }
}
