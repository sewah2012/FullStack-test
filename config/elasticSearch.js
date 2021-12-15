require('dotenv').config()
import { Client } from '@elastic/elasticsearch'
// const elasticClient = elastic.Client({
//   host: 'localhost:9200',
// })
console.log(process.env.ELASTIC_SEARCH_CLOUD_ID)
const client = new Client({
  cloud: {
    id: process.env.ELASTIC_SEARCH_CLOUD_ID,
  },
  auth: {
    username: 'elastic',
    password: '2q0N95PoB0516vJ2Q3aWmDGz',
  },
})

export default client
