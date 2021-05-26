import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('solicitations', table => {
        table.increments('id').primary();
        table.date('solicitation_date').notNullable();
        table.date('estimated_completion_date').notNullable();
        table.string('status').notNullable();
        table.boolean('priority').notNullable();
        table.date('conclusion_date');

        table.integer('student_id')
            .notNullable()
            .references('id')
            .inTable('students')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');            
        
        table.integer('document_id')
            .notNullable()
            .references('id')
            .inTable('documents')
            .onUpdate('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('solicitations');
}