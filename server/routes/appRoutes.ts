import { Request, Response, Application } from 'express';
// import { ApiController } from '../controllers/api.controller';

export class Routes {
    // public apiController: ApiController = new ApiController();

    public routes(app: Application): void {
        app.route('/api/auth').post((req: Request, res: Response) => {
            res.status(200).json({
                message: 'Get folder success',
            });
        });

        // app.route('/api/getAllFiles').get(this.apiController.getAllFiles);
    }
}
