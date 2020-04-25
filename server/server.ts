import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { DB_URL } from './util/secrets';
import { AuthRoutes } from './auth/auth.routes';
import { errorMiddleware } from './middleware/error.middleware';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.connectToDB();
        this.initRoutes();
        this.initErrorMiddleware();
        this.app.disable('x-powered-by');
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        // this.app.use(errorMiddleware);
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
        this.app.use('/api/auth', new AuthRoutes().router);
        // this.app.use("/api/products", new ProductRoutes().router);
    }

    private initErrorMiddleware(): void {
        this.app.use(errorMiddleware);
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

const server = new Server();

server.start();
