import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('academic_secretary', table => {
        table.increments('id').primary();
        table.string('employee_name').notNullable();
        table.string('cpf').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.boolean('disabled');
        
        table.integer('employee_login_id')
            .notNullable()
            .references('id')
            .inTable('logins')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('academic_secretary');
}