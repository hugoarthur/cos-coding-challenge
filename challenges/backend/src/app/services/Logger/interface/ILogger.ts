export interface ILogger {

    log(message: string): void;
    debug(message: string, params?: any): void;
    error(message: string, error?: Error): void;

}