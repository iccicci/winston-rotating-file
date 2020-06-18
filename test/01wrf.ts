"use strict";

import { readFileSync, unlinkSync } from "fs";
import { WinstonRotatingFile } from "..";
import winston from "winston";
import { ok } from "assert";

describe("WinstonRotatingFile", () => {
  before(done => {
    try {
      unlinkSync("combined.log");
      // eslint-disable-next-line no-empty
    } catch(e) {}
    try {
      unlinkSync("error.log");
      // eslint-disable-next-line no-empty
    } catch(e) {}

    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(info => `${info.timestamp} ${info.message}\n`)
      ),
      transports: [new WinstonRotatingFile({ filename: "error.log", level: "error" }), new WinstonRotatingFile({ filename: "combined.log" })]
    });

    logger.info("Info");
    logger.error("Error");

    setTimeout(() => logger.end(done), 100);
  });

  it("error", () =>
    ok(
      readFileSync("error.log")
        .toString()
        .match(/^.{19} Error\n$/)
    ));
  it("info", () =>
    ok(
      readFileSync("combined.log")
        .toString()
        .match(/^.{19} Info\n.{19} Error\n$/)
    ));
});
