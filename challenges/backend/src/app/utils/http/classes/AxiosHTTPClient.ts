import axios, { AxiosInstance, AxiosResponse } from "axios";
import { injectable } from "inversify";
import { IHTTPClient } from "../interface/IHTTPClient";
import { IHTTPRequest } from "../models/http";

@injectable()
export class AxiosHTTPClient implements IHTTPClient {
    private axiosInstance: AxiosInstance;

    constructor(private baseURL?: string) {
        this.axiosInstance = axios.create({ baseURL: this.baseURL });
    }

    get<T>(url: string, request?: IHTTPRequest): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axiosInstance.get<T, AxiosResponse<T>>(url, { params: request?.params, headers: request?.headers }).then((resp: AxiosResponse) => {
                resolve(resp.data);
            }).catch(error => {
                reject(error.response ? error.response : error);
            });
        });
    }

    post<T, D>(url:string, request?: IHTTPRequest<D>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axiosInstance.post<T, AxiosResponse<T, any>, D>(url, request?.data, { headers: request?.headers }).then((resp: AxiosResponse) => {
                resolve(resp.data);
            }).catch(error => {
                reject(error.response ? error.response : error);
            });
        });
    }

    put<T, D>(url:string, request?: IHTTPRequest<D>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axiosInstance.put<T, AxiosResponse<T, any>, D>(url, request?.data, { headers: request?.headers }).then((resp: AxiosResponse) => {
                resolve(resp.data);
            }).catch(error => {
                reject(error.response ? error.response : error);
            });
        });
    }

    delete<T, D>(url: string, request?: IHTTPRequest<D>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axiosInstance.delete<T, AxiosResponse<T>>(url, { params: request?.params, headers: request?.headers }).then((resp: AxiosResponse) => {
                resolve(resp.data);
            }).catch(error => {
                reject(error.response ? error.response : error);
            });
        });
    }

}
