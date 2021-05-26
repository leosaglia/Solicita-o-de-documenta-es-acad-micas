import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('logins', table => {
        table.increments('id').primary();
        table.string('user').notNullable();
        table.string('password').notNullable();
        table.string('type').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('logins');
}