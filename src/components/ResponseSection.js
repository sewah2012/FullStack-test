import React from 'react'
import AddResponse from './AddResponse'
import Response from './Response'

const ResponseSection = ({
  questionId,
  responseList,
  loadQuestions,
  pageNumber,
}) => {
  return (
    <div>
      <AddResponse
        questionId={questionId}
        loadQuestions={loadQuestions}
        pageNumber={pageNumber}
      />
      {responseList.map((r, ind) => (
        <Response key={ind} author={r.author} response={r.response} />
      ))}
    </div>
  )
}

export default ResponseSection
