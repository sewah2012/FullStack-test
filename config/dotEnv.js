const result = require('dotenv').config()

export default {
  esc_username: process.env.ELASTIC_SEARCH_CLOUD_USERNAME,
  esc_password: process.env.ELASTIC_SEARCH_CLOUD_PASSWORD,
  esc_id: process.env.ELASTIC_SEARCH_CLOUD_ID,

  es_username: process.env.ELASTIC_SEARCH_USERNAME,
  es_password: process.env.ELASTIC_SEARCH_PASSWORD,
  es_node: process.env.ELASTIC_SEARCH_NODE,

  mongodb_ur: process.env.MONGODB_URL,

  Kc_secret_key: process.env.KEYCLOACK_SECRET_KEY,
  node_server_port: process.env.NODE_SERVER_PORT,

  //   es_index: process.env.ELASTICSEARCH_INDEX,
  //   es_type: process.env.ELASTICSEARCH_TYPE,
  //   app_port: process.env.APP_PORT,
}

if (result.error) {
  console.log(result.error, '[Error Parsing env variables!]')
  throw result.error
}
