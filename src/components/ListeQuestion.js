import React from 'react'
import Pagination from './Pagination'

import QuestionCard from './QuestionCard'

const ListeQuestion = ({ questions, fetchMore }) => {
  const searchAfterInfo = questions[questions.length - 1].sort
  // console.log(questions)
  // console.log('first item', )
  return (
    <div className="p-2">
      {questions.map((q, ind) => (
        <QuestionCard key={ind} q={q} isFavoritePage={false} />
      ))}

      <Pagination fetchMore={fetchMore} searchAfterInfo={searchAfterInfo} />
    </div>
  )
}

export default ListeQuestion
