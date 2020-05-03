export type TokenData = {
    token: string;
    expiresIn: number;
};

export type UserData = {
    name: string;
    email: string;
};

export interface IAuthContext {
    tokenData: TokenData;
    tokenIsValid: boolean;
    userData: UserData;
    login: (userData: UserData) => void;
}
