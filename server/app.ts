import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Routes } from './routes/appRoutes';
// import * as paths from '../config/paths';

class App {
    public app: express.Application;

    public appRoutes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.connectToDB();
        this.app.use(cors());
        this.appRoutes.routes(this.app);
        // this.app.use(express.static('./dist/client'));
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private connectToDB(): void {
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => console.log('DB successfully connected...'))
            .catch((error) => console.error(error))
    }
}

export default new App().app;
