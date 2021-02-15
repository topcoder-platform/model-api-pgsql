/**
 * The Entity controller
 */
const httpStatus = require('http-status')
const { setResHeaders } = require('../helpers')
const service = require('../services/EntityService')

/**
 * Create
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function create (req, res) {
  res.status(httpStatus.CREATED).json(await service.create(req.body))
}

/**
 * Search
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function search (req, res) {
  const result = await service.search(req.query)
  setResHeaders(req, res, result)
  res.send(result.result)
}

/**
 * Get single
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function getSingle (req, res) {
  res.json(await service.getSingle(req.params.id))
}

/**
 * Fully update
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function fullyUpdate (req, res) {
  res.json(await service.fullyUpdate(req.params.id, req.body))
}

/**
 * Partially update
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function partiallyUpdate (req, res) {
  res.json(await service.partiallyUpdate(req.params.id, req.body))
}

/**
 * Delete single entry
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function deleteSingle (req, res) {
  res.json(await service.deleteSingle(req.params.id))
}

module.exports = {
  create,
  search,
  getSingle,
  fullyUpdate,
  partiallyUpdate,
  deleteSingle
}
