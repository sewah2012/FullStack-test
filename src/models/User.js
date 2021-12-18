import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    likes: { type: Array, default: [] },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)

export default User
