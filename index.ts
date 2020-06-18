"use strict";

import { createStream, Generator, Options, RotatingFileStream } from "rotating-file-stream";
import TransportStream from "winston-transport";

export interface WinstonRotatingFileOptions extends TransportStream.TransportStreamOptions {
  filename: string | Generator;
  rfsOptions?: Options;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const message = require("triple-beam").MESSAGE;

export class WinstonRotatingFile extends TransportStream {
  public stream: RotatingFileStream;

  public constructor(options: WinstonRotatingFileOptions) {
    super(options);

    this.stream = createStream(options.filename, options.rfsOptions);
  }

  public close(): void {
    this.stream.end();
  }

  public log(info: any, done: () => void): any {
    this.stream.write(info[message], done);
  }
}
