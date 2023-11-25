import _ from "lodash";
import { IGlobals } from "../databse/schema/SchemaTypes";
import { knex } from "@src/config/connection";
import pluralize from "pluralize";

export class GetFkKnes {
    static async get(dataKnex: Array<Record<string,any>>, schemaValidate: IGlobals) {
        const fieldsValid = schemaValidate.$GLOBALS.fields
        const newData = dataKnex
        for(const item of newData) {
            for(const i in item) {
                if(i?.includes('_fk_') && item[i]){
                    const newObjectEntryValueName: any = i.split('_fk_').pop()?.split('_id').shift();
                    const columnNameWhere: any = i.split('_fk_').pop()
                    item[`${newObjectEntryValueName}`] = await knex(pluralize.plural(newObjectEntryValueName)).where(columnNameWhere,item[i]).first()
                }
                if(fieldsValid[i]?.options){
                    item[i] = _.find(fieldsValid[i].options, { value: item[i] })?.label ?? ''
                }
            }
        }
        return newData
    }
}