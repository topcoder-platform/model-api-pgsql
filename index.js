/**
 * Application entry point
 */
const express = require('express')
const config = require('config')
const bodyParser = require('body-parser')
const cors = require('cors')
const _ = require('lodash')
const { errorHandler } = require('./src/helpers/middlewares')
const logger = require('./src/helpers/logger')
const routes = require('./routes')

const app = express()

// Add required middlewares
app.use(bodyParser.json())
app.use(cors())

// load routes
_.each(routes, (route, routeDef) => {
  _.each(route, (def, verb) => {
    const actions = []

    actions.push((req, res, next) => def.method(req, res).catch(e => next(e)))
    app[verb](`/${config.API_VERSION}${routeDef}`, actions)
  })
})

app.use(errorHandler)

// Start the API
app.listen(config.PORT, () => logger.info(`API is running on port ${config.PORT}`))
