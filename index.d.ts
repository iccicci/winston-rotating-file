import { Generator, Options, RotatingFileStream } from "rotating-file-stream";
import TransportStream from "winston-transport";
export interface WinstonRotatingFileOptions extends TransportStream.TransportStreamOptions {
    filename: string | Generator;
    rfsOptions?: Options;
}
export declare class WinstonRotatingFile extends TransportStream {
    stream: RotatingFileStream;
    constructor(options: WinstonRotatingFileOptions);
    close(): void;
    log(info: any, done: () => void): any;
}
