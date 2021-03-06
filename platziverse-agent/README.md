# platziverse-agent

## Usage

```js
const PlatziverseAgent = require('platziverse-agent')

const agent = new PlatziverseAgent({
  name: 'myapp',
  username: 'admin',
  interval: 2000
})

agent.addMetric('rss', function getRss() {
  return process.memoryUsage().rss
})

agent.addMetric('promiseMetric', function getRandomPromise() {
  return Promise.resolve(Math.random())
})

agent.addMetric('callbackMetric', function getRandomCallback(callback) {
  setTimeout(() => {
    callback(null, Math.random())
  }, 1000)
})

agent.connect()

// This agent only
agent.on('connected', handler)
agent.on('disconnected', handler)
agent.on('message', handler)

// Other Agents
agent.on('agent/connected', handler)
agent.on('agent/disconnected', handler)
agent.on('agent/message', handler)

function handler (payload) {
  console.log(payload)
}

setTimeout(() => agent.disconnect(), 20000)
```

## Commands for test PlatziverseAgent class
- node
- const PlatziverseAgent = require('./')
- const agent = new PlatziverseAgent({ interval: 2000 })
- agent.on('agent/message', console.log)
- agent.connect() /* Now every two seconds a message will be shown in the terminal */
- agent.disconnect()
- .exit

## Commands for execute "memoryUsage" method
- node
- process.memoryUsage()
- .exit

## Commands for execute "hostname" method
- node
- os.hostname()
- .exit

## Commands for execute code with example about how to use PlatziverseAgent
- Start containers for postgres and redis: `docker start postgres_server redis_server`
- Start platziverse-mqtt service (in platziverse-mqtt directory): `npm run start-dev`
- Run platziverse-agent example (similar to the example in this file, README.md): `node examples/index.js`

## Commands for run scripts
- Check lint: `npm run lint`

## Commands for install dependencies
- `npm i standard --save-dev`
- `npm install mqtt debug defaults --save`
- `npm install --save uuid`
