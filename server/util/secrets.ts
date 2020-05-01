import 'dotenv/config.js';

export const DB_URL = process.env["DB_URL"];

if (!DB_URL) {
    console.log("No mongo connection string. Set DB_URL environment variable.");
    process.exit(1);
}

export const JWT_SECRET = process.env["JWT_SECRET"];

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}

export const JWT_REFRESH_SECRET = process.env["JWT_REFRESH_SECRET"];

if (!JWT_REFRESH_SECRET) {
    console.log("No JWT REFRESH secret string. Set JWT_REFRESH_SECRET environment variable.");
    process.exit(1);
}
