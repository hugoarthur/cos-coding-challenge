export interface ILogger {

    log(message: string): void;
    info(message: string): void;
    debug(message: string, params?: any): void;
    warn(message: string): void;
    error(message: string, error?: Error): void;

}