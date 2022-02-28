
export interface IHTTPRequest<D = {}> {
    data?: D;
    headers?: Record<string, string | number | boolean>;
    params?: any;
}