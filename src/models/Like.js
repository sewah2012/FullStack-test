import mongoose from 'mongoose'

const likeSchema = mongoose.Schema(
  {
    _id: { type: Number, required: true },
    userId: { type: String, required: true },
    likes: { type: Array, default: [], required: true },
  },
  { _id: false },
  { timestamps: true },
)

const Like = mongoose.model('Like', likeSchema)

export default Like
