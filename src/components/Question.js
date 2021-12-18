import React from 'react'

const Question = ({ title, content, ownerId, distance, handleOpenComment }) => {
  return (
    <div className=" mx-4 md:mx-auto mt-20 max-w-md md:max-w-2xl ">
      <div className="flex items-start px-4 py-6">
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {title}
            </h2>

            <small className="text-sm text-gray-700">
              {' '}
              à {distance?.toFixed(2)} km
            </small>
          </div>

          <h4 className="text-sm text-gray-700">By: {ownerId}</h4>

          <p className="mt-3 text-gray-700 text-sm">{content}</p>
          <div className="mt-4 flex items-center">
            <div className="flex mr-2 text-gray-700 text-sm mr-3">
              <button>Like</button>
            </div>
            <div className="flex mr-2 text-gray-700 text-sm mr-8">
              <button onClick={handleOpenComment}>Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question
