import { Express, Request, response } from "express";
import fs from 'node:fs'

class SwaggerHelpers {
    constructor(
        private app: Express,
        private port: number | string = 3001,
        private swaggerDocJson = JSON.parse(fs.readFileSync(__dirname + '../../../swagger.json', 'utf8'))
    ){}

    public generate() {
        const definitions = this.swaggerDocJson.de
    }
}


// const swaggerDocs = (app: Express, port: number | string = 3001) => {

//     console.log(`Docs Avaliabçe at: http://localhost:${port}/docs`)
// }