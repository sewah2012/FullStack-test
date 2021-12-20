import { Client } from '@elastic/elasticsearch'
import dotEnv from './dotEnv'
const client = new Client({
  cloud: {
    id: dotEnv.esc_id,
  },
  auth: {
    username: dotEnv.esc_username,
    password: dotEnv.esc_password,
  },

  // node: dotEnv.es_node,
  // auth: {
  //   username: dotEnv.es_username,
  //   password: dotEnv.es_password,
  // },
})
const pingEsClient = (client) => {
  client.ping({}, async (error) => {
    if (error) return console.log('ES Server not working...', error)
    console.log('ES server connected!')

    const { body } = await client.indices.exists({ index: 'questions' })

    if (!body) {
      //create index
      const index = await onCreateIndex('questions')

      //create index mapping
      const mapping = await client.indices.putMapping({
        index: 'questions',
        body: {
          properties: {
            location: {
              type: 'geo_point',
            },
            response: {
              type: 'object',
              properties: {
                author: { type: 'text' },
                response: { type: 'text' },
              },
            },
            title: { type: 'text' },
            content: { type: 'text' },
            ownerId: { type: 'text' },
          },
        },
      })
    }
  })
}

const onCreateIndex = async (index) => {
  try {
    const ind = await client.indices.get({ index })
    if (ind) {
      console.log('index already exist and has been obtained')
      return ind
    }
  } catch (err) {
    return client.indices.create({ index: index })
  }
}
export default { pingEsClient, client }
