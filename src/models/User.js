import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    likes: { type: Array, default: [] },
    location: { name: String, long: Number, lat: Number },
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)

export default User
