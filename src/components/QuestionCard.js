import React, { useEffect, useState } from 'react'
import Question from './Question'
import ResponseSection from './ResponseSection'

const QuestionCard = ({ q, isFavoritePage }) => {
  const [openComment, setOpenComment] = useState(false)
  const [response, setResponse] = useState([])

  const handleOpenComment = () => {
    setOpenComment(!openComment)
  }

  useEffect(() => {
    setResponse(q._source.response)
    return () => {}
  }, [q._source.response])
  return (
    <div className=" bg-white shadow-lg rounded-lg">
      <Question
        q={q}
        handleOpenComment={handleOpenComment}
        isFavoritePage={isFavoritePage}
      />
      {openComment && (
        <ResponseSection responseList={response} questionId={q._id} />
      )}
    </div>
  )
}

export default QuestionCard
