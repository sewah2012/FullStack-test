import React, { useState } from 'react'
import Question from './Question'
import ResponseSection from './ResponseSection'

const QuestionCard = ({
  title,
  content,
  ownerId,
  distance,
  response,
  questionId,
}) => {
  const [openComment, setOpenComment] = useState(false)
  const handleOpenComment = () => {
    setOpenComment(!openComment)
  }
  return (
    <div className=" bg-white shadow-lg rounded-lg">
      <Question
        ownerId={ownerId}
        title={title}
        content={content}
        distance={distance}
        handleOpenComment={handleOpenComment}
      />
      {openComment && (
        <ResponseSection responseList={response} questionId={questionId} />
      )}
    </div>
  )
}

export default QuestionCard
