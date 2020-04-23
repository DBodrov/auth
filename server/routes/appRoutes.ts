import express, { Request, Response, Application } from 'express';
// import { ApiController } from '../controllers/api.controller';

const router = express.Router();

export class Routes {
    // public apiController: ApiController = new ApiController();

    public routes(): void {
        router.post('/api/auth', ).post((req: Request, res: Response) => {
            res.status(200).json({
                message: 'Get folder success',
            });
        });
        app.route('/api/register')

        // app.route('/api/getAllFiles').get(this.apiController.getAllFiles);
    }
}
