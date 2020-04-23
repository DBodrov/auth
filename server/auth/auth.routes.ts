import {Router} from 'express';
import {AuthController} from './auth.controller';

export class AuthRoutes {
    public router: Router;
    public authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.createAuthRoutes();
    }

    createAuthRoutes(): void {
        this.router.post('/register', this.authController.register)
    }
}
