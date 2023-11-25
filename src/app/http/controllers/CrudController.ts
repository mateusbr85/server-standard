import { knex } from "../../../config/connection";
import { response } from "@plugins/express/responseFunction";
import { Response, Request } from "express";
import { ErrorsCustom } from '@plugins/express/ErrorCustom'
import { IsInstancedSchema } from '@plugins/databse/IsInstancedSchema'
import pluralize from "pluralize";
import { GetFkKnes } from '@plugins/knex/GetFkKnex'
import { IGlobals } from "@plugins/databse/schema/SchemaTypes"

export class CrudController {
    static async get(req: Request, res: Response) {
        const {crud,id} = req.params;
        const whereColumn: string = pluralize.singular(crud)
        const query: Record<string,string|number|boolean|any>[] = await knex(crud).where(`${whereColumn}_id`,id)
        .first().catch((e) => {console.error(e)});
        return await response(query,res)
    }

    static async list(req: Request, res: Response) {
            const {crud} = req.params;
            const schema = await IsInstancedSchema.instacedSchemaType(crud).then((res) => {
                return res;
            }).catch((err) => {
                throw new ErrorsCustom(err.name, err.message, 422)
            })
            const isDiff = await IsInstancedSchema.getDifferenceColums(schema, crud)
            let currentPage = parseInt(req.query.page?.toString() ?? '0')
            const perPage = parseInt(req.query.perPage?.toString() ?? '10');
            const orderBy = req.query.orderBy ?? "desc"
            const query = knex(crud);
            const queryTotal = knex(crud);
            
    
            if (currentPage == 1) {
                currentPage = 0
            } else {
                currentPage = currentPage - 1
            }
    
    
    
            if (currentPage > 0) {
                query.offset(currentPage * perPage)
            }
            query.limit(perPage)
    
            let totalPages: any = (await queryTotal.count().first().catch((err) => {
                throw new ErrorsCustom(err.name, err.message, 422)
            }))?.count ?? 1;
            const registros: any = await query.orderBy(`${pluralize.singular(crud)}_id`,'desc').then(async(response) => {
                if(response !== undefined) {
                    return await GetFkKnes.get(response,schema)
                }
                return response
            }).catch((err) => {
                throw new ErrorsCustom(err.name, err.message, 422)
            });
            const totalItems: number = parseInt(totalPages);
            let getTotalPagesInt: number = Math.round((parseInt(totalPages) / 10));
            const splitFloat: Array<string> = (parseInt(totalPages) / 10)?.toString().split(".");
            // console.log(splitFloat)
            if(splitFloat.length > 1) {
                getTotalPagesInt = getTotalPagesInt + 1;
            }
            totalPages = getTotalPagesInt;
    
            return res.status(200).json({
                registros,
                pagination: { currentPage: (currentPage <= 0 ? 1 : currentPage + 1), perPage, totalPages, totalItems},
                schema,
                isDiff
            })
    }

    static async insert (req: Request, res: Response) {
        const {crud} = req.params;
        const {data} = req.body;
        const query = knex(crud);
        const errors: {message: string}[] = [];
        const succes: {message: string}[] = [];

        if(![null,undefined].includes(data)){
            await query.insert({...data}).then(() => {
                succes.push({message: 'Inserido com sucesso!'});
            }).catch((e) => {
                errors.push({message: e.message});
            })
            return res.status(200).json({
                succes,
                errors
            })
        }
        return res.status(404).end()
    }

    static async update (req: Request, res: Response) {
        const {crud,id} = req.params;
        const {data} = req.body;
        const query = knex(crud);
        const errors: {message: string}[] = [];
        const succes: {message: string}[] = [];
        const whereColumn: string = pluralize.singular(crud) + '_id';
        console.log(whereColumn)

        if(![null,undefined].includes(data)){
            await query.update({...data}).where(whereColumn,id).then(() => {
                succes.push({message: 'Alterado com sucesso!'});
            }).catch((e) => {
                errors.push({message: e.message});
            })
            return res.status(200).json({
                succes,
                errors
            })
        }
        return res.status(404).end()
    }

    static async delete (req: Request, res: Response) {
        const {crud,id} = req.params;
        const schema = await IsInstancedSchema.instacedSchemaType(crud).then((res) => {
            return res;
        }).catch((err) => {
            throw new ErrorsCustom(err.name, err.message, 422)
        })
        const errors: {message: string}[] = [];
        const succes: {message: string}[] = [];
        const whereColumn: string = pluralize.singular(crud) + '_id';

        if(crud && id){
            await knex(crud).where(whereColumn,id).del().then((res) => {
                if(res !== 0){
                    succes.push({message: 'Deletado com sucesso!'});
                }else {
                    errors.push({message: 'Nenhum item para ser deletado!'});
                }
            }).catch((e) => {
                errors.push({message: e.message});
            })
            return res.status(200).json({
                succes,
                errors
            })
        }
        
        return res.send(404).end();
    }
}