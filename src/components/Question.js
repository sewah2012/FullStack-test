import { useKeycloak } from '@react-keycloak/web'
import axios from 'axios'
import React, { useState } from 'react'
const Question = ({ q, handleOpenComment, isFavoritePage }) => {
  const [loading, setLoading] = useState(false)
  const [isLiked, setIsLiked] = useState(isFavoritePage)

  const { keycloak } = useKeycloak()

  const userId = keycloak.idTokenParsed.sub

  const likeUrl = 'http://localhost:8090/question/like'
  const unlikeUrl = `http://localhost:8090/question/unlike?userId=${userId}&questionId=${q._id}`

  const data = {
    _id: userId,
    likedQuestion: q,
  }
  const handleLike = async () => {
    setLoading(true)
    setIsLiked(true)
    const res = await axios.post(likeUrl, data)
    if (res) {
      console.log(res.data)
    }
    setLoading(false)
  }

  const handleUnlike = async () => {
    setLoading(true)

    const res = await axios.post(unlikeUrl)
    if (res) {
      console.log(res.data)
    }
    setLoading(false)
    setIsLiked(false)
  }

  return (
    <div className=" mx-4 md:mx-auto mt-20 max-w-md md:max-w-2xl ">
      <div className="flex items-start px-4 py-6">
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {q._source.title}
            </h2>

            {q.sort && (
              <small className="text-sm text-gray-700">
                à {q.sort[0]?.toFixed(2)} km
              </small>
            )}
          </div>

          <h4 className="text-sm text-gray-700">By: {q._source.ownerId}</h4>

          <p className="mt-3 text-gray-700 text-sm">{q._source.content}</p>
          <div className="mt-4 flex items-center">
            <div className="flex bg-blue-700 p-2 rounded text-white text-sm mr-8">
              <button onClick={isLiked ? handleUnlike : handleLike}>
                {isLiked ? 'Unlike' : 'Like'}
              </button>
            </div>
            {loading && <h2>loading </h2>}
            <div className="flex text-gray-700 text-sm mr-8">
              <button onClick={handleOpenComment}>Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question
