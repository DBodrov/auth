// import { StorageService } from './storage.service';
// import { DateTimeService } from './dateTime.service';

function saveToken(userToken: string, expired: number) {
    try {
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('tokenExpired', String(expired));
    } catch (error) {
        throw new Error(error);
    }
}

function getToken() {
    return 'Bearer yh10xe8Dv-AAAAAAAAAAian7l3WLH3RQGDcjBLa7WlZIsg7j8TxLyktcEsbp8lEy';
    // return localStorage.getItem('userToken');
}

function isAuth() {
    const token = localStorage.getItem('userToken');
    const expired = localStorage.getItem('tokenExpired');
    const now = Date.now();
    const tokenIsValid = token && token.trim().length > 0 && now < Number(expired);
    // const tokenExpired = new Date(Number(expired)).toLocaleString('ru');
    // console.log(tokenExpired);
    return Boolean(tokenIsValid);
}

export class AuthService {
    static readonly saveToken = saveToken;

    static readonly getToken = getToken;

    static readonly isAuth = isAuth;
}
