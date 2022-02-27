import { IHTTPRequest } from "../models/http";

export interface IHTTPClient {
    get<T>(url: string, request?: IHTTPRequest): Promise<T>;
    post<T, D>(url:string, request?: IHTTPRequest<D>): Promise<T>;
    put<T, D>(url:string, request?: IHTTPRequest<D>): Promise<T>;
    delete<T, D>(url:string, request?: IHTTPRequest<D>): Promise<T>;
}