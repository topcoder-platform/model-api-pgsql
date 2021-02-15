# PostgreSQL database API

Some of Topcoder's projects make use of PostrgreSQL instead of Dynamodb. The expectation is to usually provide helper npm scripts that run migrations (using [umzug](https://www.npmjs.com/package/umzug)) which help keep the database schema up to date and make for easier deployment

## Template

This folder contains the template for interacting with PostgreSQL through an API. You can go through it and understand how to integrate with PostgreSQL

### System requirements

- [NodeJS](https://nodejs.org/en/) - Version v14.15.4 was used during development
- [PostgreSQL](https://www.postgresql.org/)
- [Postman](https://www.postman.com/) - for verification
- [Swagger Editor](https://editor.swagger.io/)

### Configuration

- All configurations can be found and set in `./config/default.js`

- The following parameters can be set in config files or in env variables:

- LOG_LEVEL: the log level, default is 'debug'
- API_VERSION: the API version, default is v5
- PORT: the server port, default is 3000
- DATABASE_URL: the PostgreSQL database URL
- DB_SCHEMA_NAME: the database schema name
- API_BASE_URL: the API base URL
- PAGINATION: the pagination configuration

### Setup PostgreSQL locally

- You can download and install the PosgreSQL database from [here](https://www.postgresql.org/)
- Run the PgAdmin tool and create a new database
- Set the `DATABASE_URL` configuration in `./config/default.js`

### Setup PostgreSQL with Docker

- Run `cd docker-postgres`
- Run `docker-compose up -d`

### Local deployment

- Run `npm i` to install the dependencies
- Run `npm run init-db` to init the PostgreSQL DB (pass the `-- force` flag to drop existing data)
- Optionally, run `npm run lint` to perform a lint test using `StandardJS`
- Run `npm start` to start the API

### Heroku deployment

- You will need to install Heroku Toolbelt for this step if you don't already have it installed.

- In the main project folder, run the following commands:

```
  heroku login
  git init
  git add .
  git commit -m "init"
  heroku create
  heroku addons:create heroku-postgresql:hobby-dev
  git push heroku master
  heroku run npm run init-db
  heroku logs -t
  heroku open
```

- To set the configuration variables on Heroku, use the following syntax: 

```
  heroku config:set VARIABLE_NAME=value
```

### AWS Setup

- Follow [this guide](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-nodejs.rds.html) to setup a PosgreSQL database on AWS.

### Swagger

- The Swagger definition is located in `./docs/swagger.yaml`

### Postman collection

- The Postman collection and environment are located in `./docs`
