import React from 'react'

const Response = ({ author, response }) => {
  return (
    <div className="p-4 flex flex-col justify-between leading-normal">
      <div className="mb-8">
        <div className="text-gray-900 font-bold text-xl mb-3">{author}</div>
        <p className="text-gray-700 text-base">{response}</p>
      </div>
    </div>
  )
}

export default Response
