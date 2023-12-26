import { Router, Request, Response, NextFunction } from 'express';
import { AdapterEventsInterface } from './AdapterInterface';

export class isAdapterEvents  implements AdapterEventsInterface {
    protected router: Router;

    constructor() {
        this.router = Router();
    }


    public getRouter(): Router {
        return this.router;
    }
}