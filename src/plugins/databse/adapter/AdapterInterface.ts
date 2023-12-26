import { Router } from "express";

export interface AdapterInterface {
    router: Router;
    inicializeRouter(): void;
}

export interface AdapterEventsInterface {
    getRouter(): Router;
}
