/**
 * This module contains the route definitions
 */
const healthController = require('./src/controllers/HealthController')
const entityController = require('./src/controllers/EntityController')

module.exports = {
  '/health': {
    get: {
      method: healthController.check
    }
  },
  '/entities': {
    post: {
      method: entityController.create
    },
    get: {
      method: entityController.search
    }
  },
  '/entities/:id': {
    get: {
      method: entityController.getSingle
    },
    put: {
      method: entityController.fullyUpdate
    },
    patch: {
      method: entityController.partiallyUpdate
    },
    delete: {
      method: entityController.deleteSingle
    }
  }
}
