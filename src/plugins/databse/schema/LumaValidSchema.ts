import { IsInstancedSchema } from "../IsInstancedSchema";
import { ISchema,typeFieldOptions } from "./SchemaTypes";
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
        // const errors: {
        //     [key: string] : {
        //         error: string
        //     }
        // } = {};
        const errors: {
            field: string,
            code: string,
            received: string,
            expected: keyof typeFieldOptions,
            message: string
        }[] = []
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
                const isInvalid = false;
                const errorsPush = [];
                switch (instancedSchema[column].type) {
                    case 'text':
                        if(typeof valueColumns === 'string') {
                            if(valueColumns?.includes('<script')) {
                                // errorsPush.push(`Não é aceito SQL injection em nenhum campo`)
                                errors.push({
                                    field: column,
                                    code: 'Tipo Invalido',
                                    received: typeof valueColumns,
                                    expected: instancedSchema[column].type,
                                    message: 'SQL Injection Não é aceito'
                                })
                                continue
                            }
                            continue
                        }
                        errors.push({
                            field: column,
                            code: 'Tipo Invalido',
                            received: typeof valueColumns,
                            expected: instancedSchema[column].type,
                            message: 'Tipo precisa ser String'
                        })
                    break;
                    case 'checkbox': 
                        if(typeof valueColumns === 'boolean') {
                            continue;
                        }
                        errors.push({
                            field: column,
                            code: 'Tipo precisa ser Booleano',
                            received: typeof valueColumns,
                            expected: instancedSchema[column].type,
                            message: 'Tipo precisa ser String'
                        })
                    break;
                }

                // if(isInvalid) {
                //     errors[column] = {
                //             error: 'Invalid Type'
                //         }
                    
                // }
            }
        }

        if(columnsRequireds.length > 0) {
            throw new ErrorsCustom('Campos obrigatorios', columnsRequireds, 419)
        }
        if (Object.keys(errors).length > 0) {
            throw new ErrorsCustom('Campos com tipos de dados invalidos', JSON.stringify(errors), 419)
        }
        
        return
    }
}