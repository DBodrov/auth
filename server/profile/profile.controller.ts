import { Request, Response, NextFunction } from 'express';
import { UserProfileService } from './user-profile.service';

export class UserProfileController {

    public async getUserProfile(request: Request, response: Response, next: NextFunction) {
        try {
            const profileId: string = request['params'].id;
            console.log('==== profileId ====', profileId);
            const { role } = await new UserProfileService().readProfileById(profileId);
            response.status(200).send({ role });
        } catch (error) {
            next(error);
        }
    }
}
