import {ILogger} from "../interface/ILogger";
import {injectable} from "inversify";
import "reflect-metadata";

const DEBUG_CONSOLE: boolean = (process.env.DEBUG_CONSOLE === 'true') || false;
@injectable()
export class Logger implements ILogger {

    public constructor() {
    }

    public log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }

    public info(message: string): void {
        console.info(`[INFO]: ${message}`);
    }

    public debug(message: string, params?: any): void {
        if (DEBUG_CONSOLE) {
            params ? console.debug(`[DEBUG]: ${message}`, params) : console.debug(`[DEBUG]: ${message}`);
        }
    }

    public warn(message: string): void {
        console.warn(`[WARN] ${message}`);
    }

    public error(message: string, error: Error): void {
        error ? console.error(message, error) : console.error(message);
    }

}