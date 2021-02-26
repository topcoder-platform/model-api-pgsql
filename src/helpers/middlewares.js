/**
 * This module contains custom middlewares
 */
const _ = require('lodash')
const logger = require('./logger')

/**
 * Gracefully handle errors thrown from the app
 * @param {Object} err the error object
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @param {Function} next the next middleware
 */
function errorHandler (err, req, res, next) {
  logger.logFullError(err, req.signature || `${req.method} ${req.url}`)
  const errorResponse = {}
  const status = err.isJoi ? 400 : (err.httpStatus || 503)

  if (_.isArray(err.details)) {
    if (err.isJoi) {
      _.map(err.details, (e) => {
        if (e.message) {
          if (_.isUndefined(errorResponse.message)) {
            errorResponse.message = e.message
          } else {
            errorResponse.message += `, ${e.message}`
          }
        }
      })
    }
  }

  if (_.isUndefined(errorResponse.message)) {
    if (err.message && status !== 503) {
      errorResponse.message = err.message
    } else {
      errorResponse.message = 'Internal server error'
    }
  }

  res.status(status).json(errorResponse)
}

module.exports = {
  errorHandler
}
