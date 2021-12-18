import Like from '../models/Like'
const isExisting = async (id) => {
  const found = await Like.findById(id).lean()
  return found
}

export default { isExisting }
