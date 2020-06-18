# winston-rotating-file

[![Build Status][travis-badge]][travis-url]
[![Code Climate][code-badge]][code-url]
[![Test Coverage][cover-badge]][code-url]
[![Donate][donate-badge]][donate-url]

[![NPM version][npm-badge]][npm-url]
[![Types][types-badge]][npm-url]
[![NPM downloads][npm-downloads-badge]][npm-url]

[![Dependencies][dep-badge]][dep-url]
[![Dev Dependencies][dev-dep-badge]][dev-dep-url]
[![Dependents][deps-badge]][npm-url]

[code-badge]: https://codeclimate.com/github/iccicci/winston-rotating-file/badges/gpa.svg
[code-url]: https://codeclimate.com/github/iccicci/winston-rotating-file
[cover-badge]: https://codeclimate.com/github/iccicci/winston-rotating-file/badges/coverage.svg
[dep-badge]: https://david-dm.org/iccicci/winston-rotating-file.svg
[dep-url]: https://david-dm.org/iccicci/winston-rotating-file
[deps-badge]: https://badgen.net/npm/dependents/winston-rotating-file?icon=npm
[dev-dep-badge]: https://david-dm.org/iccicci/winston-rotating-file/dev-status.svg
[dev-dep-url]: https://david-dm.org/iccicci/winston-rotating-file?type=dev
[donate-badge]: https://badgen.net/badge/donate/bitcoin?icon=bitcoin
[donate-url]: https://blockchain.info/address/12p1p5q7sK75tPyuesZmssiMYr4TKzpSCN
[npm-downloads-badge]: https://badgen.net/npm/dw/winston-rotating-file?icon=npm
[npm-badge]: https://badgen.net/npm/v/winston-rotating-file?color=green&icon=npm
[npm-url]: https://www.npmjs.com/package/winston-rotating-file
[travis-badge]: https://badgen.net/travis/iccicci/winston-rotating-file?icon=travis
[travis-url]: https://travis-ci.org/iccicci/winston-rotating-file?branch=master
[types-badge]: https://badgen.net/npm/types/winston-rotating-file?color=green&icon=typescript

### Description

Transport for winston based on [rotating-file-stream](https://www.npmjs.com/package/rotating-file-stream).

### Usage

```javascript
const { WinstonRotatingFile } = require("winston-rotating-file");
const winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(info => `${info.timestamp} ${info.message}\n`)
  ),
  transports: [
    new WinstonRotatingFile({
      filename: "file.log",
      rfsOptions: {
        size: "10M", // rotate every 10 MegaBytes written
        interval: "1d", // rotate daily
        compress: "gzip" // compress rotated files
      }
    })
  ]
});
```

or (if access to [rotating-file-stream](https://www.npmjs.com/package/rotating-file-stream) events is required)

```javascript
const { WinstonRotatingFile } = require("winston-rotating-file");
const winston = require("winston");

const transport = new WinstonRotatingFile({
  filename: "file.log",
  rfsOptions: {
    size: "10M", // rotate every 10 MegaBytes written
    interval: "1d", // rotate daily
    compress: "gzip" // compress rotated files
  }
});

transport.stream.on("rotated", filename => {});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(info => `${info.timestamp} ${info.message}\n`)
  ),
  transports: [transport]
});
```

### Installation

With [npm](https://www.npmjs.com/package/winston-rotating-file):

```sh
$ npm install --save winston-rotating-file
```

# API

```javascript
const { WinstonRotatingFile } = require("winston-rotating-file");
```

## new WinstonRotatingFile(options)

Creates the _Transport_ for **winston**. Accepts all options for
[winston-transport](https://www.npmjs.com/package/winston-transport) (please refer to
[winston](https://www.npmjs.com/package/winston) for details) plus following specific options:

- `filename` (required)
- `rfsOptions`

both of them passed to
[`rfs.createStream`](https://www.npmjs.com/package/rotating-file-stream#rfscreatestreamfilename-options), please refer
to [rotating-file-stream](https://www.npmjs.com/package/rotating-file-stream) for detailed options description.

# TypeScript

Check [`index.d.ts`](https://github.com/iccicci/winston-rotating-file/blob/master/index.d.ts) for what is exported in
**TypeScript**.

# Compatibility

Requires **Node.js v10.x**.

The package is tested under [all Node.js versions](https://travis-ci.org/iccicci/winston-rotating-file)
currently supported accordingly to [Node.js Release](https://github.com/nodejs/Release#readme).

# Licence

[MIT Licence](https://github.com/iccicci/winston-rotating-file/blob/master/LICENSE)

# Bugs

Do not hesitate to report any bug or inconsistency [@github](https://github.com/iccicci/winston-rotating-file/issues).

# Donating

If you find useful this package, please consider the opportunity to donate some satoshis to this bitcoin address:
**12p1p5q7sK75tPyuesZmssiMYr4TKzpSCN**
