import React from 'react'

import QuestionCard from './QuestionCard'

const ListeQuestion = ({ questions, isLoading }) => {
  return (
    <div className="p-2">
      {questions.map((q, ind) => (
        <QuestionCard key={ind} q={q} isFavoritePage={false} />
      ))}
    </div>
  )
}

export default ListeQuestion
