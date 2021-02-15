/**
 * This module contains the route definitions
 */
const entityController = require('./src/controllers/EntityController')

module.exports = {
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
