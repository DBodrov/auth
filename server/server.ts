import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { DB_URL } from './util/secrets';
import {AuthRoutes} from './auth/auth.routes';
// import { AuthController } from './auth/auth.controller';
// import { Routes } from './routes/appRoutes';
// import * as paths from '../config/paths';

class Server {
    public app: express.Application;

    // public appRoutes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.connectToDB();
        this.initRoutes();
        // this.initControllers(controllers);
        // this.appRoutes.routes(this.app);
        // this.app.use(express.static('./dist/client'));
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.set('port', process.env.PORT || 3000);
    }

    private connectToDB(): void {
        const connection = mongoose.connection;
        connection.on('connected', () => console.log('DB connection established'));
        connection.on('reconnected', () => console.log('DB connection reestablished'));
        connection.on('disconnected', () => console.log('DB connection disconnected'));
        connection.on('close', () => console.log('DB connection close'));
        connection.on('error', (error: Error) => console.log(`DB connection error: ${error}`));

        const run = async () => {
            await mongoose.connect(DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
        };

        run().catch((error) => console.error(error));
    }

    public initRoutes(): void {
        this.app.use("/api/auth", new AuthRoutes().router);
        // this.app.use("/api/products", new ProductRoutes().router);
      }

    // initControllers(controllers: any[]): void {
    //     controllers.forEach((controller) => {
    //         this.app.use('/api/v1', controller.router);
    //     });
    // }

    // initRouters(): void {
    //     this.app.use('/');
    // }

    public start(): void {
        const PORT = this.app.get('port');
        this.app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
}

// function registerControllers() {
//     return [
//         new AuthController()
//     ]
// }

// export default new App(registerControllers()).app;

const server = new Server();

server.start();
