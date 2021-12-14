const loginController = (req, res) => {
  res.json({ message: 'Login Route working' })
}

const signupController = (req, res) => {
  res.json({ message: 'signup Route working' })
}

export default { loginController, signupController }
