import { UserModel } from "./user-model"

export interface SignInRequestModel {
    email: string
    password: string
}

export interface SignUpRequestModel {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface AuthResponse {
    user: UserModel
    accessToken: string
    tokenType: string
}