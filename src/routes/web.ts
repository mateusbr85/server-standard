import { NextFunction, Request, Response, Router } from "express";
// import dayjs from "dayjs";
import { blue, reset, yellow } from "@plugins/consoleColors";

// Classes
import { CrudController } from "@controllers/CrudController";
import { Autheticated } from "@http/auth/Autheticated";
import { ValidationSchema } from "@plugins/databse/ValidationSchema";
import asyncErrorHandler from "@src/plugins/express/AssyncHandler";
import { isInstancedAdapter, isInstancedAdapterProps } from "@src/plugins/databse/adapter/isInstancedAdapter";

const authRouter = Router();
authRouter.use(async (req: Request, res: Response, next: NextFunction) => {
    console.log(`${yellow}[Process-Request]: ${reset}${process.pid}`);
    console.log(`${blue}[API-Route]:`, `${reset}${req.originalUrl}`);
    next();
});

authRouter.post('/authenticated', async (req: Request, res: Response) => {
    await Autheticated.login(req, res)
})
authRouter.get('/authenticated/me/:token', async (req: Request, res: Response) => {
    await Autheticated.authMe(req, res)
})

const router = Router();

router.use(async (req: Request, res: Response, next: any) => {
    console.log(`${yellow}[Process-Request]: ${reset}${process.pid}`);
    console.log(`${blue}[API-Route]:`, `${reset}${req.originalUrl}`);
    next();
});


router.get("/:crud/:id/get", async (req: Request, res: Response) => {
    try {
        await CrudController.get(req, res);
    } catch (e) {
        res.status(400).json({ error: e })
    }
});

router.get("/:crud/list", asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    await CrudController.list(req, res);
}));

router.post("/:crud/insert", ValidationSchema.Validation, async (req: Request, res: Response) => {
    await CrudController.insert(req, res);
});

router.put("/:crud/:id/update", ValidationSchema.Validation, async (req: Request, res: Response) => {
    await CrudController.update(req, res);
});

router.delete('/:crud/:id/delete', async (req: Request, res: Response) => {
    await CrudController.delete(req, res);
})

const dynamicRouters = async (importModulesAdpter: isInstancedAdapterProps) => {
    const result = await importModulesAdpter.instanced()
    result.forEach((dynamicRouter) => {
        const portRouters = dynamicRouter.getRouter();
        router.use('/', portRouters); 
    });
} 
dynamicRouters( new isInstancedAdapter())


export { router, authRouter };
