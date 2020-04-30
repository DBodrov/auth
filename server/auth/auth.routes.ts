import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authMiddleware } from './auth.middleware';

export class AuthRoutes {
    public router: Router;
    public authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.createAuthRoutes();
    }

    createAuthRoutes(): void {
        this.router.post('/register', this.authController.register);
        this.router.post('/login', this.authController.signIn);
        this.router.get('/users/me', authMiddleware, async (req, res) => {
            res.send(req['user']);
        });
        this.router.get('/token', this.authController.getAccessToken)
    }
}
