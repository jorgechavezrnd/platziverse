# platziverse-api

## Commands for run scripts
- Check lint: `npm run lint`
- Start server on dev mode: `npm run start-dev`
- Run tests: `npm test`

## Commands for test api with `http` command (similar to `curl`)
- `http http://192.168.0.14:3000/api/agents`
- `http http://192.168.0.14:3000/api/agent/yyyx`
- `http http://192.168.0.14:3000/api/metrics/yyyx`
- `http http://192.168.0.14:3000/api/metrics/yyyx/temp`

## Commands for test auth.js module
- `node`
- `var auth = require('./auth')`
- `auth.sign({ username: 'jorgechavez' }, 'platzi', console.log)`
- `auth.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvcmdlY2hhdmV6IiwiaWF0IjoxNjQyMTMzNjc1fQ.bDERXB4V9WyD05NOGZNu5Cg3vP2qbrdAiKqAATnCV3M', 'platzi', console.log)` where the first param is the encoded text with jwt

## Command for test api with jwt
- With token for user 'jorgechavez': `curl -v -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvcmdlY2hhdmV6IiwiaWF0IjoxNjQyMTMzNjc1fQ.bDERXB4V9WyD05NOGZNu5Cg3vP2qbrdAiKqAATnCV3M' http://localhost:3000/api/agents | jq`

## Commands for install dependencies
- `npm i standard nodemon --save-dev`
- `npm install express debug --save`
- `npm i chalk --save`
- `npm install --save-dev ava supertest`
- `npm install sinon proxyquire --save-dev`
- `npm install jsonwebtoken --save`
- `npm install express-jwt --save`

# Notes for package.json
- Script `start-dev` for Windows: `set DEBUG=platziverse:* & nodemon server.js`
- Script `start-dev` for Linux or MacOS: `DEBUG=platziverse:* nodemon server.js`
