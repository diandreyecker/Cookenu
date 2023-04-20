export interface UserInputDTO {
    name: string,
    email: string,
    password: string
}

export interface User {
    id: string,
    name: string,
    email: string,
    password: string
}

export interface AuthenticationData {
    id: string;
}

export interface LoginUserInputDTO {
    email: string,
    password: string
}