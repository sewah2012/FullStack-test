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
})
const pingEsClient = (client) => {
  client.ping({}, async (error) => {
    if (error) return console.log('ES Server not working...', error)
    console.log('ES server connected!')

    //create index
    // const index = await onCreateIndex('questions')
    //mapping
    // const mapping = await client.indices.putMapping({
    //   index: 'questions',
    //   body: {
    //     properties: {
    //       location: {
    //         type: 'nested',
    //         properties: {
    //           name: {
    //             type: 'text',
    //           },
    //           longitude: {
    //             type: 'integer',
    //           },
    //           latitude: {
    //             type: 'integer',
    //           },
    //         },
    //       },
    //       response: {
    //         type: 'nested',
    //         properties: {
    //           author: { type: 'text' },
    //           response: { type: 'text' },
    //         },
    //       },
    //       title: { type: 'text' },
    //       content: { type: 'text' },
    //       ownerId: { type: 'text' },
    //     },
    //   },
    // })

    // console.log('mapping', mapping)
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
