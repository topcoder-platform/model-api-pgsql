/**
 * The Entity model definition
 */
const { Sequelize, Model } = require('sequelize')
const config = require('config')
const errors = require('../helpers/errors')

module.exports = (sequelize) => {
  class Entity extends Model {
    /**
     * Get Entity by id
     * @param {String} id the entity id
     * @returns {Entity} the Entity instance
     */
    static async findById (id) {
      const entity = await Entity.findOne({
        where: {
          id
        }
      })
      if (!entity) {
        throw new errors.NotFoundError(`id: ${id} "Entity" doesn't exists.`)
      }
      return entity
    }
  }
  Entity.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
      }
    },
    {
      schema: config.DB_SCHEMA_NAME,
      sequelize,
      tableName: 'entities',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      timestamps: true
    }
  )

  return Entity
}
