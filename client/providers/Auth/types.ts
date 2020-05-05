export type TokenData = {
    token: string;
    expiresIn: number;
};

export type UserData = {
    name: string;
    email: string;
}

export type LoginData = {
    email: string;
    password: string;
}

export type RegistrationData = UserData & LoginData;

export interface IAuthContext {
    tokenData: TokenData;
    tokenIsValid: boolean;
    userData: UserData;
    login: (loginData: LoginData) => void;
    register: (registrationData: RegistrationData) => void;
}
