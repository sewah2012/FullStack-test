import React from 'react'
import QuestionCard from './QuestionCard'

const SearchHits = ({ results }) => {
  //   console.log(results)
  return (
    <div>
      {results.map((result, ind) => (
        <QuestionCard key={ind} q={result} />
      ))}
    </div>
  )
}

export default SearchHits
