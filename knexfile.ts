import type { Knex } from "knex";
import doteEnvConfig from './src/config/doteEnv';
doteEnvConfig

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: 'postgres://hjkmfnbp:spyzY7th0wWvCKE1JcG_-vGB4Ji71JTz@silly.db.elephantsql.com/hjkmfnbp',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations"
    }
  },
  production: {
    client: "postgresql",
    connection: 'postgres://hjkmfnbp:spyzY7th0wWvCKE1JcG_-vGB4Ji71JTz@silly.db.elephantsql.com/hjkmfnbp',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations"
    }
  }

};

module.exports = config;
