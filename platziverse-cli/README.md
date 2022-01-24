# platziverse-cli

## Command for run cli
- `node .\platziverse.js`
- Keys for quit: `escape`, `q` or `Ctrl + C`

## Run example:
- Start containers: `docker start postgres_server redis_server`
- Start cli application (in platziverse-cli): `node .\platziverse.js`
- Start mqtt server (in platziverse-mqtt directory): `npm run start-dev`
- Run example of platziverse agent (in platziverse-agent directory): `node .\examples\index.js`
- For expand each agent and display the graphic for each metric, click `Enter` on any agent and any metric

## Commands for install dependencies
- `npm i standard --save-dev`
- `npm install blessed blessed-contrib --save`
- `npm install moment --save`
