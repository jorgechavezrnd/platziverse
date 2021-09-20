'use strict'

const net = require('net')
const debug = require('debug')('platziverse:mqtt')
const chalk = require('chalk')
const db = require('platziverse-db')

const { parsePayload } = require('./utils')

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
const clients = new Map()

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

function handleError (err) {
  console.error(`${chalk.red('[error]')} ${err.message}`)
  console.error(err.stack)
}

aedes.on('client', client => {
  debug(`Client Connected: ${client.id}`)
  clients.set(client.id, null)
})

aedes.on('clientDisconnect', async (client) => {
  debug(`Client Disconnected: ${client.id}`)
  const agent = clients.get(client.id)

  if (agent) {
    // Mark Agent as Disconnected
    agent.connected = false

    try {
      await Agent.createOrUpdate(agent)
    } catch (e) {
      return handleError(e)
    }

    clients.delete(client.id)

    aedes.publish({
      topic: 'agent/disconnected',
      payload: JSON.stringify({
        agent: {
          uuid: agent.uuid
        }
      })
    })
    debug(`Client (${client.id}) associated to Agent (${agent.uuid}) marked as disconnected`)
  }
})

aedes.on('publish', async (packet, client) => {
  debug(`Received: ${packet.topic}`)

  switch (packet.topic) {
    case 'agent/connected':
    case 'agent/disconnected':
      debug(`Payload: ${packet.payload}`)
      break
    case 'agent/message': {
      debug(`Payload: ${packet.payload}`)

      const payload = parsePayload(packet.payload)

      if (payload) {
        payload.agent.connected = true

        let agent
        try {
          agent = await Agent.createOrUpdate(payload.agent)
        } catch (e) {
          return handleError(e)
        }

        debug(`Agent ${agent.uuid} saved`)

        // Notify Agent is Connected
        if (!clients.get(client.id)) {
          clients.set(client.id, agent)
          aedes.publish({
            topic: 'agent/connected',
            payload: JSON.stringify({
              agent: {
                uuid: agent.uuid,
                name: agent.name,
                hostname: agent.hostname,
                pid: agent.pid,
                connected: agent.connected
              }
            })
          })
        }

        // Store Metrics
        for (const metric of payload.metrics) {
          let m

          try {
            m = await Metric.create(agent.uuid, metric)
          } catch (e) {
            return handleError(e)
          }

          debug(`Metric ${m.id} saved on agent ${agent.uuid}`)
        }
      }
      break
    }
  }
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)