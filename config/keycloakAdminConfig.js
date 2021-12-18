import KcAdminClient from '@keycloak/keycloak-admin-client'
const credentials = {
  username: 'admin',
  password: 'admin123',
  grantType: 'password',
  clientId: 'fullstack-test-api',
  clientSecret: '404d51e7-3c06-49ea-ab18-77e6d3b3b444',
}

const adminClient = new KcAdminClient({
  baseUrl: 'http://localhost:8088/auth',
  realmName: 'fullstack-test',
})

const getAllUsers = async () => {
  await adminClient.auth(credentials)
  const users = await adminClient.users.find()

  return users
}

const registerNewUser = async () => {
  await adminClient.auth(credentials)
  const newUser = await adminClient.users.create({
    username: 'second',
    email: 'second@example.com',
    password: 'pass123',
  })

  return newUser
}

export default { getAllUsers, registerNewUser }
