import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('users', (table) => {
        table.increments('user_id', { primaryKey: true });
        table.string('user_name', 100);
        table.string('user_email', 50);
        table.string('user_password', 32);
        table.dateTime('created_at');
        table.integer('created_by');
        table.dateTime('updated_at');
        table.integer('updated_by');
        table.dateTime('deleted_at');
        table.integer('deleted_by');
    })

}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

