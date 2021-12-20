import React from 'react'

const Pagination = ({ fetchMore, searchAfterInfo }) => {
  const handleMoreClick = () => {
    fetchMore(searchAfterInfo[0], searchAfterInfo[1])
  }

  return (
    <div
      onClick={handleMoreClick}
      className="cursor-pointer p-3 bg-indigo-300 w-fit rounded mt-3"
    >
      <h1>Next Page </h1>
    </div>
  )
}

export default Pagination
