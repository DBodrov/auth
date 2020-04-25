export class HttpException extends Error {
    public status: number;
    public message: string;
    public fallbackUrl: string;
    constructor(status: number, message: string, fallbackUrl?: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.fallbackUrl = fallbackUrl || '';
    }
}
