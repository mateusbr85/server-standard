export class ErrorsCustom extends Error {
    name: string;
    httpCode: number;
    constructor(name: string, err: any, httpCode: number) {
        super(err);
        // Define o título do erro
        this.name = name;
        // Define o código HTTP
        this.httpCode = httpCode;
    }
}