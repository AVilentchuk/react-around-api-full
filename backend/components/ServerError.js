// Custom class constructor for errors
module.exports = class ServerError extends Error {
  constructor({ message, name, code }) {
    super(message);
    this.name = name;
    this.code = code;
  }
};
