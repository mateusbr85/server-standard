import { NextFunction, Request, Response, Router } from "express";
// import dayjs from "dayjs";
import { blue, reset, yellow } from "@plugins/consoleColors";

// Classes
import { CrudController } from "@controllers/CrudController";
import { Autheticated } from "@http/auth/Autheticated";
import { ValidationSchema } from "@plugins/databse/ValidationSchema";
import asyncErrorHandler from "@src/plugins/express/AssyncHandler";
import { knex } from "@src/config/connection";

const authRouter = Router();
authRouter.use(async (req: Request, res: Response, next: NextFunction) => {
    console.log(`${yellow}[Process-Request]: ${reset}${process.pid}`);
    console.log(`${blue}[API-Route]:`, `${reset}${req.originalUrl}`);
    next();
});

authRouter.post('/authenticated',async (req: Request, res: Response) => {
    await Autheticated.login(req,res)
})
authRouter.get('/authenticated/me/:token',async (req: Request, res: Response) => {
    await Autheticated.authMe(req,res)
})

const router = Router();

router.use(async (req: Request, res: Response, next: any) => {
    console.log(`${yellow}[Process-Request]: ${reset}${process.pid}`);
    console.log(`${blue}[API-Route]:`, `${reset}${req.originalUrl}`);
    next();
});

// Validação de Schema
// router.use(ValidationSchema.Validation)

router.get("/:crud/:id/get", async (req: Request, res: Response) => {
    try {
        await CrudController.get(req, res);
    }catch(e){
        res.status(400).json({error: e})
    }
});

router.get("/:crud/list",  asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    await CrudController.list(req, res);
}));

router.post("/:crud/insert", ValidationSchema.Validation, async (req: Request, res: Response) => {
    await CrudController.insert(req, res);
});

router.put("/:crud/:id/update", ValidationSchema.Validation,async (req: Request, res: Response) => {
    await CrudController.update(req, res);
});

router.delete('/:crud/:id/delete', async (req: Request, res: Response) => {
    await CrudController.delete(req, res);
})


// router.use(async(error: any, req: Request, res: Response, next: NextFunction) => {
//     await knex('query_log_errors').insert({
//         query_log_error_name: error.name,
//         query_log_error_message: error.message,
//         query_log_error_location: error.stack
//     })
//     const isJson = (input: string) => {
//         try {
//             return JSON.parse(input);
//         } catch (e) {
//             return input;
//         }
//         return true;
//     }
//     return res.status(error.httpCode !== undefined ? error.httpCode : 404).json({ title: error.name, error: isJson(error.message), location: error.stack });
// });


export {router,authRouter};
