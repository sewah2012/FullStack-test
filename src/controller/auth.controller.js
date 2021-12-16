import KcAdminClient from '@keycloak/keycloak-admin-client'

let settings = {
  baseUrl: 'http://localhost:8088/auth',
  realmName: 'fullstack-test',
}

const kcAdminClient = new KcAdminClient(settings)

const loginController = (req, res) => {
  res.json({ message: 'Login Route working' })
}

const signupController = async (req, res) => {
  res.json({ message: 'signup Route working' })

  const credentials = {
    username: 'eman',
    password: 'pass123',
    grantType: 'password',
    clientId: 'fullstack-test-api',
    clientSecret: '404d51e7-3c06-49ea-ab18-77e6d3b3b444',
  }
  await kcAdminClient.auth(credentials)

  // const users = await kcAdminClient.users.find()

  //signup user in keycloak with custom properties
}

export default { loginController, signupController }
