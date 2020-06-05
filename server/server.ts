import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { AuthRoutes } from './auth/auth.routes';
import { UserRoutes } from './user/user.routes';
import { errorMiddleware } from './exceptions';
import {DbConnection} from './db';

class Server {
    #db: DbConnection;
    public app: express.Application;

    constructor() {
        this.app = express();
        this.#db = new DbConnection();

        this.initializeMiddlewares();
        this.config();
        this.initRoutes();
        this.initErrorMiddleware();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    private config(): void {
        this.app.use(cors());
        this.app.set('port', process.env.PORT || 3000);
    }

    public initRoutes(): void {
        this.app.use('/api/auth', new AuthRoutes().router);
        this.app.use('/api/users', new UserRoutes().router);
        // this.app.use('/api/user-profile')
        // this.app.use('api/user-profile/', new )
    }

    private initErrorMiddleware(): void {
        this.app.use(errorMiddleware);
    }

    public start(): void {
        const PORT = this.app.get('port');
        this.#db.connect();
        this.app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
}

export const server = new Server();
server.start();
