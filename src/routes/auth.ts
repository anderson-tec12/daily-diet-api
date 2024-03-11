import crypto from 'node:crypto'

import { FastifyInstance } from 'fastify'
import { Knex } from 'knex'
import { z } from 'zod'

export function authRoutes(knex: Knex) {
  return async (app: FastifyInstance) => {
    app.post('/register', async (request, reply) => {
      try {
        const registerUserParamsSchema = z.object({
          email: z.string(),
          password: z.string(),
        })

        const { email, password } = registerUserParamsSchema.parse(request.body)

        await knex('users').insert({
          id: crypto.randomUUID(),
          email,
          password,
        })

        return reply.status(201).send()
      } catch (err) {
        reply
          .status(400)
          .send('Erro, verifique as propriedades, EMAIL e PASSWORD')
      }
    })

    app.post('/login', async (request, reply) => {
      try {
        const schemaParamsLogin = z.object({
          email: z.string(),
          password: z.string(),
        })
        const { email, password } = schemaParamsLogin.parse(request.body)

        const user = await knex('users')
          .select()
          .where({
            email,
            password,
          })
          .first()

        if (!user) {
          throw new Error('erro')
        }

        return user
      } catch {
        return reply.status(400).send('Erro ao realizar login')
      }
    })
  }
}
