import './config/moduleAlias';
import express from 'express';
import doteEnvConfig from './config/doteEnv';
import bodyParser from 'body-parser';
import cors from 'cors'
import {router, authRouter} from './routes/web';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import { knex } from './config/connection';
import swaggerDocs from './plugins/swagger/swagger';
const app = express();
doteEnvConfig

app.use(cors())

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//rotas
app.use('/api/v1/', router);
app.use('/api/auth/',authRouter);

app.use(async(error: any, req: Request, res: Response, next: NextFunction) => {
    const idError = await knex('query_log_errors').insert({
        query_log_error_name: error.name,
        query_log_error_message: error.message,
        query_log_error_location: error.stack
    }).returning('query_log_error_id')
    const isJson = (input: string) => {
        try {
            return JSON.parse(input);
        } catch (e) {
            return input;
        }
        return true;
    }
    return res.status(error.httpCode !== undefined ? error.httpCode : 404).json({ title: error.name, error: isJson(error.message), location: error.stack, id_error: idError[0].query_log_error_id });
});

swaggerDocs(app, process.env.port)


export default app;