const fs = require('fs');
const audit = require('express-requests-logger');
const bunyan = require('bunyan');
const path = require('path');

const logDirectory = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logStream = fs.createWriteStream(path.join(logDirectory, 'logs.log'), {
  flags: 'a'
});

const errorStream = fs.createWriteStream(path.join(logDirectory, 'errors.log'), {
  flags: 'a'
});

function customStream() {}
customStream.prototype.write = function (data, target) {
  target.write(data);
};

const infoLogger = bunyan.createLogger({
  name: 'around-the-world',
  level: 'info',
  stream: logStream
});
module.exports.errLogger = bunyan.createLogger({
  name: 'around-the-world',
  level: 'error',
  stream: errorStream
});

module.exports.reqLogger = audit({
  logger: infoLogger,

  request: {
    maskBody: ['password'],
    excludeHeaders: ['authorization'],
    excludeBody: ['password', 'hostname'],
    maskHeaders: ['header1'],
    maxBodyLength: 50
  },
  response: {
    audit: false,
    maskBody: ['session_token'],
    excludeHeaders: ['*'],
    excludeBody: ['*'],
    maskHeaders: ['header1'],
    maxBodyLength: 50
  }
});
