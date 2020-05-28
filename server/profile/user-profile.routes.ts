import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import {UserProfileController} from './profile.controller';

abstract class Routes {
    abstract createRoutes(): void
}

export class UserProfileRoutes extends Routes {
    public router: Router;
    public userProfileController: UserProfileController;

    constructor() {
        super()
        this.router = Router();
        this.userProfileController = new UserProfileController();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get('/profile/:profileId', authMiddleware, this.userProfileController.getUserProfile)
    }

}
