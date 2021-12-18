import React, { useState } from 'react'
import AddResponse from './AddResponse'
import Response from './Response'

const ResponseSection = ({ questionId, responseList }) => {
  return (
    <div>
      <AddResponse questionId={questionId} />
      {responseList.map((r, ind) => (
        <Response key={ind} author={r.author} response={r.response} />
      ))}
    </div>
  )
}

export default ResponseSection
