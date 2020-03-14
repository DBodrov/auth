type StorageType = 'local' | 'session';

export class StorageService {
    storageType: string;

    storage: Storage;

    constructor(type: StorageType) {
        this.storageType = type;
        this.storage = type === 'local' ? window.localStorage : window.sessionStorage;
    }

    setItem(key: string, value: string) {
        try {
            return this.storage.setItem(key, JSON.stringify(value));
        } catch (error) {
            throw new Error(error);
        }
    }

    getItem(key: string) {
        try {
            const cachedValue = this.storage.getItem(key);

            return JSON.parse(cachedValue);
        } catch (error) {
            throw new Error(error);
        }
    }

    removeItem(key: string) {
        try {
            this.storage.removeItem(key);
        } catch (error) {
            throw new Error(error);
        }
    }
}
