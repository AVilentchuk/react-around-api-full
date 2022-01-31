// Custom class constructor for errors
module.exports = class ServerError extends Error {
  constructor({
    message, fileName, lineNumber, name, code
  }) {
    super(message, fileName, lineNumber);
    this.name = name;
    this.code = code;
  }
};
