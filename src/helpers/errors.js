/**
 * Custom HTTP errors
 */
const util = require('util')
const httpStatus = require('http-status')

/**
 * Helper function to create generic error object with http status code
 * @param {String} name the error name
 * @param {Number} statusCode the http status code
 * @returns {Function} the error constructor
 */
function createError (name, statusCode) {
  /**
   * The error constructor
   * @param {String} message the error message
   * @param {Strinng} cause the error cause
   * @constructor
   */
  function ErrorCtor (message, cause) {
    Error.call(this)
    Error.captureStackTrace(this)
    this.message = message || name
    this.cause = cause
    this.httpStatus = statusCode
  }

  util.inherits(ErrorCtor, Error)
  ErrorCtor.prototype.name = name
  return ErrorCtor
}

module.exports = {
  BadRequestError: createError('BadRequestError', httpStatus.BAD_REQUEST),
  NotFoundError: createError('NotFoundError', httpStatus.NOT_FOUND),
  ServiceUnavailableError: createError('ServiceUnavailableError', httpStatus.SERVICE_UNAVAILABLE)
}
