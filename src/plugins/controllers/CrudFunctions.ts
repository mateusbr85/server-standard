import { knex } from "../../config/connection";
import lodash from 'lodash'

const getSchemaDb = async (table: string): Promise<Record<string,any>[]> => {
    return await knex('information_schema.columns').select('table_name','column_name','data_type').where('table_name',table)
}

export {getSchemaDb}