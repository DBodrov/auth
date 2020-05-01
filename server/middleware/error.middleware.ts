import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';

export function errorMiddleware(
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) {
    console.log('inside err mw', error);
    const status = error.status || 500;
    console.log('error status = ', status);
    const message = error.message || 'Something went wrong';
    const redirectUrl = error.fallbackUrl;
    response.status(status).send({
        message,
        status,
        redirectUrl
    });
}
