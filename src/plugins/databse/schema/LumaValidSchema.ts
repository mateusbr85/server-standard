import { IsInstancedSchema } from "../IsInstancedSchema";
import { ISchema } from "./SchemaTypes";
import { ErrorsCustom } from '@plugins/express/ErrorCustom';
// import lodash from "lodash";

export class LumaValidSchema {
    private static verifyIfOthersColumns (
        ArrayFieldsValue: any,
        SchemaCrud: any
    ) {
        const result: any = {};
        for(const field in ArrayFieldsValue) {
            if(SchemaCrud[field]) {
                result[field] = ArrayFieldsValue[field]
            }
        }
        return result;
    }


    static async validate (
        crud: string,
        ArrayFieldsValue: ISchema
    ) {
        const errors: any = [];
        const instancedSchema = await IsInstancedSchema.instanced(crud).then((response) => {
            return response.$GLOBALS.fields
        })
        const columnsVerifyOther = this.verifyIfOthersColumns(ArrayFieldsValue,instancedSchema);
        const columnsRequireds = [];
        for(const column in instancedSchema) {
            if(!columnsVerifyOther[column]) {
                if(instancedSchema[column].required) {
                    columnsRequireds.push(column)
                }
            }
            if(columnsVerifyOther[column]) {
                const valueColumns: any = columnsVerifyOther[column]
                let isInvalid = false;
                switch (instancedSchema[column].type) {
                    case 'text':
                        if(typeof valueColumns === 'string') {
                            console.log(columnsVerifyOther[column])
                        }else {
                            isInvalid = true
                            
                        }
                    break
                }

                if(isInvalid) {
                    errors.push({
                        [column]: {
                            error: 'Invalid Type'
                        }
                    })
                }
            }
        }

        if(columnsRequireds.length > 0) {
            throw new ErrorsCustom('Campos obrigatorios', columnsRequireds, 419)
        }
        throw new ErrorsCustom('Campos com tipos de dados invalidos', errors, 419)
        
        return
    }
}