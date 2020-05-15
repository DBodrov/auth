import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

export class UserController {
    #userService: UserService;

    constructor() {
        this.#userService = new UserService();
    }

    public async readUser(request: Request, response: Response, next: NextFunction) {
        try {
            const userId: string = request['userId'];
            const {_id, email, name, profileId} = await this.#userService.getUserById(userId);
            response.status(200).send({ _id, email, name, profileId });
        } catch (error) {
            next(error);
        }
    }


}
