# platziverse-api

## Commands for run scripts
- Check lint: `npm run lint`
- Start server on dev mode: `npm run start-dev`

## Commands for install dependencies
- `npm i standard nodemon --save-dev`
- `npm install express debug --save`
- `npm i chalk --save`

# Notes for package.json
- Script `start-dev` for Windows: `set DEBUG=platziverse:* & nodemon server.js`
- Script `start-dev` for Linux or MacOS: `DEBUG=platziverse:* nodemon server.js`
