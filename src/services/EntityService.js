/**
 * The Entity service that exposes the operations related to the Entity model
 */
const Joi = require('joi')
const _ = require('lodash')
const config = require('config')
const { Entity } = require('../models')
const logger = require('../helpers/logger')

/**
 * Create a new Entity
 * @param {Object} entity the entity data
 */
async function create (entity) {
  const newEntity = await Entity.create({
    createdAt: new Date(),
    ...entity
  })
  return newEntity
}

create.schema = {
  entity: Joi.object().keys({
    name: Joi.string().required().max(255),
    description: Joi.string().max(255)
  }).required()
}

/**
 * Search entities
 * @param {Object} criteria the query criteria
 */
async function search (criteria) {
  const whereClause = {}
  const { page, perPage } = criteria
  if (criteria.name) {
    whereClause.name = criteria.name
  }
  const res = await Entity.findAndCountAll({
    where: whereClause,
    offset: (page - 1) * perPage, // pagination starts from 0
    limit: perPage
  })
  return { total: res.count, result: res.rows, page, perPage }
}

search.schema = {
  criteria: Joi.object().keys({
    name: Joi.string().max(255),
    page: Joi.number().integer().min(config.PAGINATION.MIN_PAGE).default(config.PAGINATION.DEFAULT_PAGE),
    perPage: Joi.number().integer().min(1).max(100).default(config.PAGINATION.DEFAULT_PER_PAGE)
  }).unknown(true)
}

/**
 * Get single
 * @param {String} id the Entity ID
 */
async function getSingle (id) {
  return await Entity.findById(id)
}

/**
 * Perform an update operation
 * @param {String} id the Entity ID
 * @param {Object} data the updated data
 */
async function update (id, data) {
  const doc = await getSingle(id)
  _.assign(doc, data)
  return await doc.save()
}

/**
 * Fully update an Entity
 * @param {String} id the Entity ID
 * @param {Object} data the updated data
 */
async function fullyUpdate (id, data) {
  return update(id, data)
}

fullyUpdate.schema = {
  id: Joi.string().uuid().required(),
  data: Joi.object().keys({
    name: Joi.string().max(255).required(),
    description: Joi.string().max(255).default(null)
  }).required()
}

/**
 * Partially update an Entity
 * @param {String} id the Entity ID
 * @param {Object} data the updated data
 */
async function partiallyUpdate (id, data) {
  return update(id, data)
}

partiallyUpdate.schema = {
  id: Joi.string().uuid().required(),
  data: Joi.object().keys({
    name: Joi.string().max(255),
    description: Joi.string().max(255)
  }).required()
}

/**
 * Delete an entity
 * @param {String} id the Entity ID
 */
async function deleteSingle (id) {
  const doc = await getSingle(id)
  await doc.destroy()
}

deleteSingle.schema = {
  id: Joi.string().uuid().required()
}

module.exports = {
  create,
  search,
  getSingle,
  partiallyUpdate,
  fullyUpdate,
  deleteSingle
}

logger.autoValidate(module.exports)
