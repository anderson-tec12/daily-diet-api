import { knex as setupKnex, Knex as IKnex } from 'knex'

import { env } from './env'

export const configKnex: IKnex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(configKnex)
