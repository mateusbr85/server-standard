import _ from "lodash";
import pluralize from "pluralize";
import { z, ZodObject } from 'zod';
import { getSchemaDb } from '@plugins/controllers/CrudFunctions'
import { IGlobals } from "@plugins/databse/schema/SchemaTypes"
import { ErrorsCustom } from '@plugins/express/ErrorCustom'

export class IsInstancedSchema {

    static async getDifferenceColums(schemaColumns: IGlobals, crudName: string) {
        const schemaDb = await getSchemaDb(crudName);
        const fieldsSchema = Object.keys(schemaColumns.$GLOBALS.fields).filter((key) => {
            return schemaColumns.$GLOBALS.fields[key].type !== 'grid';
        });
        
        const fieldsSchemaDb:any = schemaDb.map((value: any) => {
            if (!value.column_name?.includes('created_by')
                && !value.column_name?.includes('created_at')
                && !value.column_name?.includes('created_by')
                && !value.column_name?.includes('guid')
            ){
                if(value.column_name !== undefined) {
                    return value.column_name
                }
            }
        })
        const columnsDiff = _.difference(fieldsSchema, fieldsSchemaDb)
        if (columnsDiff.length > 0) {
            return {
                message: 'Existem algumas colunas que não foram criadas!',
                columns: columnsDiff
            }
        }
        return
    }

    static async instanced(crudName: string): Promise<IGlobals> {
        try {
            const instancedName = _.startCase(
                _.camelCase(
                    pluralize.singular(
                        crudName
                            .split("-")
                            .join("_")
                            .split("_")
                            .map((item: string) => pluralize.singular(item))
                            .join("_"),
                    ),
                ),
            ).split(" ").join("");
            const isntancedSchema = await import(`@src/database/${instancedName}/${instancedName}Schema`);
            return isntancedSchema[`${instancedName}Schema`]
        } catch (e: any) {
            throw new Error(e)
        }
    }

    static async instacedSchemaType(crudName: string):Promise<IGlobals> {
        const instancedName = _.startCase(
            _.camelCase(
                pluralize.singular(
                    crudName
                        .split("-")
                        .join("_")
                        .split("_")
                        .map((item: string) => pluralize.singular(item))
                        .join("_"),
                ),
            ),
        ).split(" ").join("");
        const isntancedSchema = await import(`@src/database/${instancedName}/${instancedName}Schema`);
        return isntancedSchema[`${instancedName}Schema`]
    }
}