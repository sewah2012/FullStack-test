import React, { useState } from 'react'
import Pagination from './Pagination'

import QuestionCard from './QuestionCard'

const ListeQuestion = ({ questions, fetchMore, pageCount, loadQuestions }) => {
  // const searchAfterInfo = questions[questions.length - 1].sort
  // console.log(questions)
  // console.log('first item', )
  const [pageNumber, setPageNumber] = useState(0)
  return (
    <div className="p-2">
      {questions.map((q, ind) => (
        <QuestionCard
          key={ind}
          q={q}
          isFavoritePage={false}
          loadQuestions={loadQuestions}
          pageNumber={pageNumber}
        />
      ))}

      <Pagination
        fetchMore={fetchMore}
        pageCount={pageCount}
        setPageNumber={setPageNumber}
      />
    </div>
  )
}

export default ListeQuestion
