/**
 * Sync the database models to db tables.
 */
const config = require('config')
const models = require('../models')
const { Entity } = require('../models')
const logger = require('../helpers/logger')
const entities = require('../../resources/entities')

const loadDB = async () => {
  if (process.env.NODE_ENV !== 'development') {
    logger.error('Database loading should be executed in development env')
    process.exit()
  }
  await models.sequelize.dropSchema(config.DB_SCHEMA_NAME)
  await models.sequelize.createSchema(config.DB_SCHEMA_NAME)
  await models.sequelize.sync({ force: true })
  for (const entity of entities) {
    await Entity.create({
      createdAt: new Date(),
      id: entity.id,
      name: entity.name,
      description: entity.description
    })
  }
}

if (!module.parent) {
  loadDB().then(() => {
    logger.info({ component: 'load-db', message: 'Database loaded successfully' })
    process.exit()
  }).catch((e) => {
    logger.logFullError(e, { component: 'load-db' })
    process.exit(1)
  })
}

module.exports = {
  loadDB
}
