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

## Commands for require password in postgres_server container
- `docker exec -it postgres_server bash`
- `apk update`
- `apk add vim`
- `cd /var/lib/postgresql/data`
- `vim pg_hba.conf`
- In lines 84, 86 and 88, replace 'trust' by 'password'
- Exit from container
- `docker stop postgres_server`
- `docker start postgres_server`
- `docker exec -it postgres_server bash`
- `su - postgres`
- `psql -U platzi platziverse`
- Now password should be required, the password is 'platzi'

## Commands for login in platziverse database with platzi user
- `docker exec -it postgres_server bash`
- `su - postgres`
- `psql -U platzi platziverse`

## Commands for run scripts
- Check lint: `npm run lint`
- Fix lint errors: `npm run lint -- --fix`
- Setup database: `npm run setup`
- Run setup script with intentional error, for see the error message using 'chalk' library: `DB_PASS='foo' npm run setup`
- Run tests, we use 'nyc' module for code coverage, and the coverage report in HTML will be located in 'coverage/lcov-report/index.html' after run this command: `npm test`

## Commands for test module
- `node`
- `const setupDatabase = require('./')`
- `setupDatabase()`

## Commands for install dependencies
- `npm i --save-dev standard`
- `npm i sequelize pg pg-hstore --save`
- `npm i debug --save`
- `npm i inquirer chalk --save`
- `npm install --save-dev ava`
- `npm i --save defaults`
- `npm i sqlite3 --save-dev`
- `npm i nyc --save-dev`
