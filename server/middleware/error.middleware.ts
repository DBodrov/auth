import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';

export function errorMiddleware(
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) {
    console.log('inside err mw', error)
    const status = error.status || 500;
    console.log('error status = ', status);
    const message = error.message || 'Something went wrong';
    if (status === 302) {
        const url = error.fallbackUrl || '/';
        response.redirect(url, 303);
    } else {
        response.status(status).send({
            message,
            status,
        });
    }
}
