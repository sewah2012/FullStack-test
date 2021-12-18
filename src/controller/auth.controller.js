import KcAdminClient from '../../config/keycloakAdminConfig'

const loginController = (req, res) => {
  res.json({ message: 'Login Route working' })
}

const signupController = async (req, res) => {
  // const users = await KcAdminClient.getAllUsers()
  const newUser = await KcAdminClient.registerNewUser()
  console.log(newUser)
  res.json({ user: newUser })
}

export default { loginController, signupController }
