/**
 * Default configurations
 */
module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  API_VERSION: process.env.API_VERSION || 'v5',
  PORT: process.env.PORT || 2003,
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/api-template',
  DB_SCHEMA_NAME: process.env.DB_SCHEMA_NAME || 'entities',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:2003',
  PAGINATION: {
    MIN_PAGE: 1,
    MIN_PER_PAGE: 1,
    DEFAULT_PAGE: 1,
    DEFAULT_PER_PAGE: 20,
    MAX_PER_PAGE: 100
  }
}
