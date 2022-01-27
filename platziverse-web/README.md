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

## Debug with chrome developers tools
- `node --inspect server.js`
- Go to chrome and enter this URL: `chrome://inspect`
- Click on `inspect` button that refers to `server.js` process
- In `Sources`, add the `platziverse` folder to workspace if it was not already added
- Now we can debug, for example, with breakpoints in source files of `platziverse-web` and `platziverse-agent`

## Debug with visual studio code (platziverse-web or platziverse-api)
- Create settings for debug in vscode (in folder `.vscode` and file `launch.json`)
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug platziverse-web",
            "program": "${workspaceFolder}/platziverse-web/server.js",
            "skipFiles": [
                "<node_internals>/**"
            ]
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Debug platziverse-api",
            "program": "${workspaceFolder}/platziverse-api/server.js",
            "skipFiles": [
                "<node_internals>/**"
            ]
        }
    ]
}
```
