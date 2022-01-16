# platziverse-web

## Run example:
- Start containers: `docker start postgres_server redis_server`
- Start mqtt server (in platziverse-mqtt directory): `npm run start-dev`
- Run example of platziverse agent (in platziverse-agent directory): `node .\examples\index.js`

## Commands for create default token in config.js (in platziverse-api directory)
- `node`
- `var auth = require('./auth')`
- `auth.sign({ username: 'platzi', admin: true, permissions: ['metrics:read'] }, 'platzi', console.log)`

## Commands for install dependencies
- `npm i standard nodemon --save-dev`
- `npm install express debug --save`
- `npm install chalk@4.1.2 --save`
- `npm install socket.io --save`
- `npm install axios --save`
