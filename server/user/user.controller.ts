import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

export class UserController {
    public async readUser(request: Request, response: Response, next: NextFunction) {
        try {
            const userId: string = request['userId'];
            const { _id, email, name, profileId } = await new UserService().getUserById(userId);
            response.status(200).send({ _id, email, name, profileId });
        } catch (error) {
            next(error);
        }
    }
}
