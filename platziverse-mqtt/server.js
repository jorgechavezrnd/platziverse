'use strict'

const net = require('net')
const debug = require('debug')('platziverse:mqtt')
const chalk = require('chalk')

const redisPersistence = require('aedes-persistence-redis')
const aedes = require('aedes')({
  persistence: redisPersistence({
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    maxSessionDelivery: 100
  })
})

const server = net.createServer(aedes.handle)

server.listen(1883, function() {
  console.log(`${chalk.green('[platziverse-mqtt]')} server is running`)
})
