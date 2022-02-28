import { IError } from "./GenericError";
import { UserRole, UserType } from "./User";

export interface IAuthenticationRequest {
    password: string;
    meta?: string;
}

export interface IAuthenticationResult {
    authenticated: boolean;
    userId: string;
    internalUserId: number;
    internalUserUUID: string;
    token: string;
    type: UserType;
    privileges: string;
    userRole?: UserRole;
    authenticationChallenge?: string;
    authenticationError?: IError;
}