import { isAdapterEvents } from "@src/plugins/databse/adapter/isAdapterEvents";

export class UserRouter extends isAdapterEvents {
    constructor() {
        super()
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.get('/mateus', (req, res) => {
            return res.status(200).send({ message: 'sasds' })
        });
        this.router.get('/novo/mateus', (req, res) => {
            return res.status(200).send({ message: 'novo' })
        })
        this.router.post('/insert/item', (req, res) => {
            return res.status(200).send({ message: 'inserido' })
        })
    }

}