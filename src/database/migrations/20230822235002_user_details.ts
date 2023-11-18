import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_details',(table) => {
        table.increments('user_detail_id', { primaryKey: true });
        table.dateTime('user_detail_due_date');
        table.dateTime('user_detail_started_date');
        table.dateTime('created_at');
        table.integer('created_by');
        table.dateTime('updated_at');
        table.integer('updated_by');
        table.dateTime('deleted_at');
        table.integer('deleted_by');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user_details");
}

