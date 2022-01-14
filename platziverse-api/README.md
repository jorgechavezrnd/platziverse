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
- Create JWT for user with admin role: `auth.sign({ permissions: ['metrics:read'], username: 'platzi', admin: true, iat: 1502334997 }, 'platzi', console.log)`

## Command for test api with jwt
- With token for user 'jorgechavez': `curl -v -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvcmdlY2hhdmV6IiwiaWF0IjoxNjQyMTMzNjc1fQ.bDERXB4V9WyD05NOGZNu5Cg3vP2qbrdAiKqAATnCV3M' http://localhost:3000/api/agents | jq`
- With token for admin user 'platzi' for list agents: `curl -v -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6WyJtZXRyaWNzOnJlYWQiXSwidXNlcm5hbWUiOiJwbGF0emkiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTAyMzM0OTk3fQ.CZr3G7SAENPYjKC1mMK-NxGiFce9GrlsGHOC_BH4umU' http://192.168.0.14:3000/api/agents | jq`
- With token for admin user 'platzi' for list metrics: `curl -v -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6WyJtZXRyaWNzOnJlYWQiXSwidXNlcm5hbWUiOiJwbGF0emkiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTAyMzM0OTk3fQ.CZr3G7SAENPYjKC1mMK-NxGiFce9GrlsGHOC_BH4umU' http://192.168.0.14:3000/api/metrics/c464f90a-b9ac-41d6-98f8-124f9b3590a1 | jq`
- With token for admin user 'platzi' for list metrics but without 'metrics:read' permission: `curl -v -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6W10sInVzZXJuYW1lIjoicGxhdHppIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwMjMzNDk5N30.XQnIv54W3Iabwx9PzvT1xy9c87T19wxKjeA-vi7FXl0' http://192.168.0.14:3000/api/metrics/c464f90a-b9ac-41d6-98f8-124f9b3590a1 | jq`

## Commands for install dependencies
- `npm i standard nodemon --save-dev`
- `npm install express debug --save`
- `npm i chalk --save`
- `npm install --save-dev ava supertest`
- `npm install sinon proxyquire --save-dev`
- `npm install jsonwebtoken --save`
- `npm install express-jwt --save`
- `npm install express-jwt-permissions --save`

# Notes for package.json
- Script `start-dev` for Windows: `set DEBUG=platziverse:* & nodemon server.js`
- Script `start-dev` for Linux or MacOS: `DEBUG=platziverse:* nodemon server.js`
