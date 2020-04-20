import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import {RegisterController} from './controllers/auth.controller';
// import { Routes } from './routes/appRoutes';
// import * as paths from '../config/paths';

class App {
    public app: express.Application;

    // public appRoutes: Routes = new Routes();

    constructor(controllers: any[]) {
        this.app = express();
        this.config();
        this.connectToDB();
        this.app.use(cors());
        this.initControllers(controllers);
        // this.appRoutes.routes(this.app);
        // this.app.use(express.static('./dist/client'));
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private connectToDB(): void {
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
            .then(() => console.log('DB successfully connected...'))
            .catch((error) => console.error(error))
    }

    initControllers(controllers: any[]): void {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }
}

function registerControllers() {
    return [
        new RegisterController()
    ]
}

export default new App(registerControllers()).app;
