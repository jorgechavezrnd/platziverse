# platziverse-api

## Commands for run scripts
- Check lint: `npm run lint`
- Start server on dev mode: `npm run start-dev`
- Run tests: `npm test`

# Commands for test api with `http` command (similar to `curl`)
- `http http://192.168.0.14:3000/api/agents`
- `http http://192.168.0.14:3000/api/agent/yyyx`
- `http http://192.168.0.14:3000/api/metrics/yyyx`
- `http http://192.168.0.14:3000/api/metrics/yyyx/temp`

## Commands for install dependencies
- `npm i standard nodemon --save-dev`
- `npm install express debug --save`
- `npm i chalk --save`
- `npm install --save-dev ava supertest`
- `npm install sinon proxyquire --save-dev`

# Notes for package.json
- Script `start-dev` for Windows: `set DEBUG=platziverse:* & nodemon server.js`
- Script `start-dev` for Linux or MacOS: `DEBUG=platziverse:* nodemon server.js`
