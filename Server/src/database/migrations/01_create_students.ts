import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('students', table => {
        table.increments('id').primary();
        table.string('ra').unique().notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('cellphone').notNullable();
        table.string('course').notNullable();
        table.integer('period').notNullable();
        table.boolean('disabled');

        table.integer('student_login_id')
            .notNullable()
            .references('id')
            .inTable('logins')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('students');
}