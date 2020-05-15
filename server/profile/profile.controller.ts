import { Request, Response, NextFunction } from 'express';
import { UserProfileService } from './user-profile.service';

export class UserProfileController {
    #userProfileService: UserProfileService;

    constructor() {
        this.#userProfileService = new UserProfileService();
    }

    public getUserProfile(request: Request, response: Response, next: NextFunction) {
        // const userId
    }
}
