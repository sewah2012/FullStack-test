import React from 'react'
import QuestionCard from './QuestionCard'

const SearchHits = ({ results }) => {
  //   console.log(results)
  return (
    <div>
      {results.map((result, ind) => (
        <QuestionCard
          key={ind}
          title={result._source.title}
          content={result._source.content}
          ownerId={result._source.ownerId}
          response={result._source.response}
          questionId={result._id}
        />
      ))}
    </div>
  )
}

export default SearchHits
