# platziverse-agent

## Usage

```js
const PlatziverseAgent = require('platziverse-agent')

const agent = new PlatziverseAgent({
  interval: 2000
})

agent.connect()

agent.on('agent/message', payload => {
  console.log(payload)
})

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

## Commands for run scripts
- Check lint: `npm run lint`

## Commands for install dependencies
- `npm i standard --save-dev`
