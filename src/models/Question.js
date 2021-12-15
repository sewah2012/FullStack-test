import mongoose from 'mongoose'

const questionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    ownerId: { type: String, required: true },
    reponse: { type: Array, default: [] },
    location: { name: String, long: Number, lat: Number },
  },
  { timestamps: true },
)

const Question = mongoose.model('Question', questionSchema)

export default Question
