import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import {UserController} from './user.controller';
import {UserProfileController} from '../profile';

abstract class Routes {
    abstract createRoutes(): void
}

export class UserRoutes extends Routes {
    public router: Router;
    public userController: UserController;
    public userProfileController: UserProfileController;

    constructor() {
        super()
        this.router = Router();
        this.userController = new UserController();
        this.userProfileController = new UserProfileController();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get('/me', authMiddleware, this.userController.readUser);
        this.router.get('/profile/:id', authMiddleware, this.userProfileController.getUserProfile);
    }

}
