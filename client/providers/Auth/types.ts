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
    token: string;
    tokenIsValid: boolean;
    userData: UserData;
    login: (loginData: LoginData) => void;
    logout: () => void;
    register: (registrationData: RegistrationData) => void;
}
