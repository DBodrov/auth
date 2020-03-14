import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Routes } from './routes/appRoutes';
// import * as paths from '../config/paths';

class App {
    public app: express.Application;

    public appRoutes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.app.use(cors());
        this.appRoutes.routes(this.app);
        // this.app.use(express.static('./dist/client'));
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;
