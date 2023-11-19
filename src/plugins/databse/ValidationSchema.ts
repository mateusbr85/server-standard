import { Request, Response, NextFunction, } from "express";
import { IsInstancedModel } from "./isInstancedModel";
import { IsInstancedSchema } from "./IsInstancedSchema";
import { ErrorsCustom } from '@plugins/express/ErrorCustom';
import { LumaValidSchema } from "./schema/LumaValidSchema";
// import {OnValidate} from '@models/User'

export class ValidationSchema {
    static async Validation(req: Request, res: Response, next: NextFunction) {
        try {
            const { crud } = req.params;
            const { data } = req.body;
            const instancedClass = await IsInstancedModel.instanced(crud);
            let isValidatePass = true;
            if (instancedClass['onValidate'] && typeof instancedClass['onValidate'] == 'function') {
                await instancedClass['onValidate'](data).then((responseModel) => {
                    return responseModel
                }).catch((error) => {
                    isValidatePass = false
                    throw new Error(error)
                })
            }
            if (isValidatePass == true) {
                // await instancedSchema.parseAsync(data).then((responseSchema) => {
                //     return responseSchema
                // }).catch((err) => {
                //     throw new ErrorsCustom('Validation Schema', err.message, 422)
                // })
                await LumaValidSchema.validate(crud,data)
            }
            // throw new Error('aaa')
            return next()
        } catch (e: any) {
            // Se ocorrer um erro durante a validação, você pode tratá-lo aqui
            const isJson = (input: string) => {
                try {
                    return JSON.parse(input);
                } catch (e) {
                    return input;
                }
                return true;
            }
            res.status(e.httpCode !== undefined ? e.httpCode : 404).json({ title: e.name, error: isJson(e.message), location: e.stack });
        }
    }
}