import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { AuthService } from './auth.service';

export interface IUserCred {
    userLogin: string;
    userToken: string;
}

export interface IRequestParams {
    url: string;
    params?: object;
    headers?: object;
    data?: object;
    noToken?: boolean;
}

function getToken(): { authorization: string } {
    const token = AuthService.getToken();
    if (token) {
        return { authorization: token };
    }
    throw new Error('Токен не найден');
}

function createHeaders(headers: object, noToken = false) {
    if (!noToken) {
        const token = getToken();
        return { ...token, ...headers };
    }
    return { ...headers };
}

function getData({ url, params = {}, headers = {}, noToken = false }: IRequestParams): AxiosPromise {
    const options: AxiosRequestConfig = {
        url,
        method: 'get',
        responseType: 'json',
        headers: createHeaders(headers, noToken),
        ...params,
    };

    return axios(options);
}

function postData({ url, params = {}, data, headers = {}, noToken = false }: IRequestParams): AxiosPromise {
    const options: AxiosRequestConfig = {
        url,
        method: 'post',
        // proxy: { host: 'localhost', port: 3128 },
        // responseType: 'json',
        headers: createHeaders(headers, noToken),
        data: data ? { ...data } : 'null',
        ...params,
    };

    // console.log(options);

    return axios(options);
}

function putData({
    url,
    params = {},
    data = {},
    headers = {},
    noToken = false,
}: IRequestParams): AxiosPromise {
    return axios({
        url,
        method: 'put',
        responseType: 'json',
        headers: createHeaders(headers, noToken),
        data: { ...data },
        ...params,
    });
}

function deleteData({
    url,
    params = {},
    data = {},
    headers = {},
    noToken = false,
}: IRequestParams): AxiosPromise {
    return axios({
        url,
        method: 'delete',
        responseType: 'json',
        headers: createHeaders(headers, noToken),
        data: { ...data },
        ...params,
    });
}

export class HttpService {
    public static readonly getData = getData;

    public static readonly postData = postData;

    public static readonly putData = putData;

    public static readonly deleteData = deleteData;
}
