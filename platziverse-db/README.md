# platziverse-db

## Usage

``` js
const setupDatabase = require('platziverse-db')

setupDatabase(config).then(db => {
  const { Agent, Metric } = db
}).catch(err => console.error(err))
```

## Commands for setup database with docker
- `docker pull postgres:9.6.6-alpine`
- `docker run -d --name postgres_server -p 5432:5432 -e POSTGRES_PASSWORD=platzi postgres:9.6.6-alpine`
- `docker exec -it postgres_server bash`
- `su - postgres`
- `psql postgres`
- `CREATE ROLE platzi WITH LOGIN PASSWORD 'platzi';`
- `CREATE DATABASE platziverse;`
- `GRANT ALL PRIVILEGES ON DATABASE platziverse TO platzi;`
- `\quit`

## Commands for run scripts
- Check lint: `npm run lint`
- Fix lint errors: `npm run lint -- --fix`
- Setup database: `npm run setup`

## Commands for test module
- `node`
- `const setupDatabase = require('./')`
- `setupDatabase()`

## Commands for install dependencies
- `npm i --save-dev standard`
- `npm i sequelize pg pg-hstore --save`
- `npm i debug --save`
