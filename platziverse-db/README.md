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
- Run setup database without confirmation question: `npm run setup -- --yes` or `npm run setup -- -y`
- Run setup with error and see how longjohn works: `DB_HOST=foo npm run setup`. For Windows in cmd: `set DB_HOST=foo && npm run setup`
- Run example for longjohn: `node example`

## Commands for test module
- `node`
- `const setupDatabase = require('./')`
- `setupDatabase()`

## Commands for test agent fixtures
- `node`
- `var agentFixtures = require('./tests/fixtures/agent')`
- `agentFixtures.single`
- `agentFixtures.platzi`
- `agentFixtures.byId(1)`

## Commands for run a simple example with sinon
- `node`
- `var sinon = require('sinon')`
- `var findById = sinon.stub()`
- `findById()`
- `findById(1)`
- `findById.withArgs(1).returns('platzi')`
- `findById.withArgs(2).returns('jotason')`
- `findById(1)`
- `findById(2)`

## Commands for install dependencies
- `npm i --save-dev standard`
- `npm i sequelize pg pg-hstore --save`
- `npm i debug --save`
- `npm i inquirer chalk --save`
- `npm install --save-dev ava`
- `npm i --save defaults`
- `npm i sqlite3 --save-dev`
- `npm i nyc --save-dev`
- `npm install --save-dev sinon`
- `npm i proxyquire --save-dev`
- `npm install --save-dev longjohn`
