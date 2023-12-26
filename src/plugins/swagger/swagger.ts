import { Express, Request, Response, Router, application } from "express";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../../package.json';


const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentation Bank',
            version: version,
            description: 'API RESTful',
            contact: {
                name: 'test suporte',
                email: 'asdadd@asda.com'
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        basePath: "/api/v1/",
        paths: {
            "/get/{id}/all": {
                get: {
                    parameters: [{
                       in: 'path',
                       name: 'id',
                       schema: {
                        type: 'integer'
                       },
                       required: true
                    }],
                    responses: {
                        200: {
                            description: 'OK'
                        }
                    }
                }
            },

            "/create": {
                post: {
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type:'string'
                                        },
                                        describe: {
                                            type:'string'
                                        }
                                    }
                                }
                            }
                        },
                        responses: {
                            200: {
                                description: 'OK'
                            }
                        }
                    }
                }
            },
            "adasd": {

            }
        }
    } as swaggerJsDoc.OAS3Definition,
    apis: ['./src/routes/web.ts']
};


const swaggerSpec = swaggerJsDoc(options);
// console.log('testet >>>> ', options)

const swaggerDocs = (app: Express, port: number | string = 3001) => {
    app.use('/docs',
        swaggerUi.serve, swaggerUi.setup(swaggerSpec)
    )

    // Docs in Jsson Format

    app.get('docs.josn',(req: Request, res: Response) => {
        try{
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec)
        }catch(e) {
            console.log(e)
        }
    })

    console.log(`Docs Avaliabçe at: http://localhost:${port}/docs`)
}

export default swaggerDocs;