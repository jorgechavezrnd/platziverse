# platziverse-web

## URL of base repository for this project
- `https://github.com/byron7cueva/backend-javascript/tree/master/node-avanzado/platziverse-web`

## Run example:
- Start containers: `docker start postgres_server redis_server`
- Start mqtt server (in platziverse-mqtt directory): `npm run start-dev`
- Start api server (in platziverse-api directory): `npm run start-dev`
- Start web server (in platziverse-web directory): `npm run start-dev`
- Run example of platziverse agent (in platziverse-agent directory): `node .\examples\index.js`

## Commands for create default token in config.js (in platziverse-api directory)
- `node`
- `var auth = require('./auth')`
- `auth.sign({ username: 'platzi', admin: true, permissions: ['metrics:read'] }, 'platzi', console.log)`
