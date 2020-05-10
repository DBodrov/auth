import mongoose from 'mongoose';
import { DB_URL } from './util/secrets';

export class DbConnection {
    private connection: mongoose.Connection;
    constructor() {
        this.connection = mongoose.connection;
        this.dbEventListener();
    }

    private dbEventListener() {
        this.connection.on('connected', () => console.log('DB connection established'));
        this.connection.on('reconnected', () => console.log('DB connection reestablished'));
        this.connection.on('disconnected', () => console.log('DB connection disconnected'));
        this.connection.on('close', () => console.log('DB connection close'));
        this.connection.on('error', (error: Error) => console.log(`DB connection error: ${error}`));
    }

    async createConnection() {
        return await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    }

    public connect() {
        this.createConnection().catch(console.error);
    }
}
