import React from 'react'
import QuestionCard from './QuestionCard'

const FavoritesList = ({ isLoading, questions }) => {
  return (
    <div className="p-2">
      {isLoading ? (
        <h1 className="mx-auto w-15">loading ...</h1>
      ) : (
        questions.map((q, ind) => (
          <QuestionCard key={ind} q={q} isFavoritePage={true} />
        ))
      )}
    </div>
  )
}

export default FavoritesList
