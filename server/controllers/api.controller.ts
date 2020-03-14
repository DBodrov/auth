import { Request, Response } from 'express';
// import { Dropbox } from 'dropbox';
import { HttpService } from '../services';

// const dbx = new Dropbox({
//     accessToken: 'yh10xe8Dv-AAAAAAAAAAian7l3WLH3RQGDcjBLa7WlZIsg7j8TxLyktcEsbp8lEy',
//     fetch: axios,
// });

const folderPath = { path: '' };

export class ApiController {
    private BASE_URL: string;

    constructor() {
        this.BASE_URL = 'https://api.dropboxapi.com';
    }

    public async getAllFiles(req: Request, res: Response) {
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        const url = 'https://api.dropboxapi.com/2/files/list_folder';
        // const url = 'https://api.dropboxapi.com/2/users/get_current_account';
        // const url = 'https://jsonplaceholder.typicode.com/todos/1';
        const headers = { 'content-type': 'application/json' };
        try {
            const { data } = await HttpService.postData({ url, headers, data: folderPath });
            res.status(200).send(data);
        } catch (error) {
            console.error(error);
            res.status(500).send('error');
            // throw new Error(error);
        }
        // dbx.filesListFolder(folderPath)
        // dbx.usersGetCurrentAccount()
        //     .then(response => {
        //         console.log(response);
        //         res.status(200).send({ data: response });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         res.status(500).send('Error occured');
        //     });
    }
}
