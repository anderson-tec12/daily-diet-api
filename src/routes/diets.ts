import { FastifyInstance } from 'fastify'
import { Knex } from 'knex'
import { z } from 'zod'
import crypto from 'node:crypto'

export function dietsRoutes(knex: Knex) {
  return async (app: FastifyInstance) => {
    app.get('/all/:id', async (request) => {
      const getRequestSchema = z.object({
        id: z.string(),
      })
      const { id } = getRequestSchema.parse(request.params)

      const diets = await knex('meats').select().where({
        user_id: id,
      })

      return {
        diets,
      }
    })

    app.post('/:id', async (request, reply) => {
      const getRequestSchema = z.object({
        id: z.string(),
      })

      const bodyRequestSchema = z.object({
        name: z.string(),
        description: z.string(),
        datetime: z.string(),
        is_diet: z.string(),
      })

      const { id: userId } = getRequestSchema.parse(request.params)

      const data = bodyRequestSchema.parse(request.body)

      const payload = {
        ...data,
        user_id: userId,
        id: crypto.randomUUID(),
      }

      await knex('meats').insert(payload)

      return reply.status(201).send()
    })

    app.put('/edit/:id', async (request, reply) => {
      const getRequestSchema = z.object({
        id: z.string(),
      })

      const bodyRequestSchema = z.object({
        name: z.string(),
        description: z.string(),
        datetime: z.string(),
        is_diet: z.string(),
        id: z.string(),
      })

      const { id: userId } = getRequestSchema.parse(request.params)

      const data = bodyRequestSchema.parse(request.body)

      const payload = {
        ...data,
        user_id: userId,
      }

      await knex('meats')
        .where({
          id: data.id,
        })
        .update(payload)

      return reply.status(200).send()
    })

    app.delete('/:id', async (request, reply) => {
      // const getRequestSchema = z.object({
      //   id: z.string(),
      // })

      const bodyRequestSchema = z.object({
        id: z.string(),
      })

      const data = bodyRequestSchema.parse(request.body)

      // const { id: userId } = getRequestSchema.parse(request.params)

      await knex('meats')
        .where({
          id: data.id,
        })
        .delete()
      reply.status(200).send()
    })
  }
}
