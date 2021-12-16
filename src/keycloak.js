import Keycloak from 'keycloak-js'
const keycloak = new Keycloak({
  url: 'http://localhost:8088/auth',
  realm: 'fullstack-test',
  clientId: 'fullstack-test-react',
})

export default keycloak
