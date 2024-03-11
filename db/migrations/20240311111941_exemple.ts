import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('exemplo', (table) => {
    table.uuid('exemplo_id').primary()
    table.bigInteger('user_id').unsigned()
    table.text('name').notNullable()
    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('SET NULL')
      .onUpdate('SET NULL')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('exemplo')
}
