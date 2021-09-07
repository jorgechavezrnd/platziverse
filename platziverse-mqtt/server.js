'use strict'

const net = require('net')
const debug = require('debug')('platziverse:mqtt')
const chalk = require('chalk')
const db = require('platziverse-db')

const redisPersistence = require('aedes-persistence-redis')
const aedes = require('aedes')({
  persistence: redisPersistence({
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    maxSessionDelivery: 100
  })
})

const config = {
  database: process.env.DB_NAME || 'platziverse',
  username: process.env.DB_USER || 'platzi',
  password: process.env.DB_PASS || 'platzi',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: s => debug(s)
}

const server = net.createServer(aedes.handle)

let Agent, Metric

server.listen(1883, function (error) {
  if (!error) {
    console.log(`${chalk.green('[platziverse-mqtt]')} server is running`)
  } else {
    handleFatalError(error)
  }
})

server.on('listening', async () => {
  const service = await db(config).catch(handleFatalError)

  Agent = service.Agent
  Metric = service.Metric
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

aedes.on('client', client => {
  debug(`Client Connected: ${client.id}`)
})

aedes.on('clientDisconnect', client => {
  debug(`Client Disconnected: ${client.id}`)
})

aedes.on('publish', (packet, client) => {
  debug(`Received: ${packet.topic}`)
  debug(`Payload: ${packet.payload}`)
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
