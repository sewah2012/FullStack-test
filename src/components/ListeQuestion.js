import React from 'react'

import QuestionCard from './QuestionCard'

const ListeQuestion = ({ questions, isLoading }) => {
  return (
    <div className="p-2">
      {isLoading ? (
        <h1>loading ...</h1>
      ) : (
        questions.map((q, ind) => (
          <QuestionCard
            key={ind}
            title={q._source.title}
            content={q._source.content}
            distance={q.sort[0]}
            ownerId={q._source.ownerId}
            response={q._source.response}
            questionId={q._id}
          />
        ))
      )}
    </div>
  )
}

export default ListeQuestion
