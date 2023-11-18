import knexRoot from 'knex';
import doteEnvConfig from '../config/doteEnv';
doteEnvConfig

export const knex = knexRoot({
    client: process.env.DB_DATACLIENT,
    connection: {
        host: process.env.DB_HOST,
        port: 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }
})