import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('comments', table => {
        table.increments('id').primary();
        table.string('description').notNullable();
        table.date('comment_date').notNullable();

        table.integer('login_id')
            .notNullable()
            .references('id')
            .inTable('logins')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');    
            
        table.integer('solicitation_id')
            .notNullable()
            .references('id')
            .inTable('solicitations')
            .onUpdate('CASCADE')
            .onDelete('CASCADE'); 
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('comments');
}