import {ILogger} from "../interface/ILogger";
import {injectable} from "inversify";
import "reflect-metadata";

const CONSOLE_DEBUG: boolean = Boolean(process.env.CONSOLE_DEBUG) || false;
@injectable()
export class Logger implements ILogger {

    public constructor() {
    }

    public log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }

    public debug(message: string, params?: any): void {
        if (CONSOLE_DEBUG) {
            params ? console.debug(`[DEBUG]: ${message}`, params) : console.debug(`[DEBUG]: ${message}`);
        }
    }

    public error(message: string, error: Error): void {
        error ? console.error(message, error) : console.error(message);
    }

}