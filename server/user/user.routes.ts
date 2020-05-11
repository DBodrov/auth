import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import {UserController} from './user.controller';

abstract class Routes {
    abstract createRoutes(): void
}

export class UserRoutes extends Routes {
    public router: Router;
    public userController: UserController;

    constructor() {
        super()
        this.router = Router();
        this.userController = new UserController();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get('/me', authMiddleware, this.userController.readUser)
    }

}
