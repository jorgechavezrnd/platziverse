# platziverse-agent

## Commands for test PlatziverseAgent class
- node
- const PlatziverseAgent = require('./')
- const agent = new PlatziverseAgent()
- agent.on('agent/message', console.log)
- agent.emit('agent/message', 'this is the message')
- .exit
