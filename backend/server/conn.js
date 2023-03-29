
'use strict'
const { Client } = require('@elastic/elasticsearch')

const index = 'market'
const port = 9200
const host = process.env.ELASTIC_HOST || 'elasticsearch'
const user = process.env.ELASTIC_USER || 'elastic'
const pwd = process.env.ELASTIC_PASSWORD || 'changeme'

const client = new Client({
  node: `http://${host}:${port}`,
  auth: {
    username: user,
    password: pwd
  }
})

async function checkConnection () {
  let isConnected = false
  while (!isConnected) {
    console.log('Connecting to ES')
    try {
      const health = await client.cluster.health({})
      console.log(health)
      isConnected = true
    } catch (err) {
      console.log('Connection Failed, Retrying...', err)
    }
  }
}

async function resetIdx () {
  if (await client.indices.exists({ index })) {
    await client.indices.delete({ index })
  }
}

checkConnection()

module.exports = {
  client, index, checkConnection, resetIdx
}

