'use strict'

const net = require('net')
const debug = require('debug')('platziverse:mqtt')
const chalk = require('chalk')
const db = require('platziverse-db')

const { parsePayload } = require('./utils')

// Aedes is a barebone MQTT Server that can run on any stream server
// See https://github.com/moscajs/aedes
// redisPersistence to make aedes backend with redis
// https://www.npmjs.com/package/aedes-persistence-redis
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

// The server is implemented with `net` core module that expose a createServer method
// The net module provides an asynchronous network API for create stream-based
// TCP or IPC servers (net.createServer()) and clients (net.createConnection()).
// See https://nodejs.org/api/net.html#net_event_connection
const server = net.createServer(aedes.handle)

// Map to store clients connected
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

        // Here the logic to store metrics
        // With map we try to save the metrics parallelly.
        // `map` accepts a sync callback so it returns an array of promises
        // then wait until all the promises are solved and store them into
        // `resolvedPromises` array. At the end we log all the ids of each saved
        // metric and its associated agent
        try {
          const promises = payload.metrics.map(async (metric) => {
            const createdMetric = await Metric.create(agent.uuid, metric)
            return createdMetric
          })

          const resolvedPromises = await Promise.all(promises)

          resolvedPromises.forEach((metric) => {
            debug(
              `[saved-metric]: Metric ${metric.id} saved with Agent ${agent.uuid}`
            )
          })
        } catch (error) {
          handleError(error)
        }
      }
      break
    }
  }
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
