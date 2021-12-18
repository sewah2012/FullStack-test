import React, { useState } from 'react'

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="bg-white mt-5 flex items-center bg-purple-white shadow rounded border-0 p-3 lg:w-[30%] ml-auto mr-auto md:w-[80%] sm:w-[80%]">
      <input
        name="searchTerm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="search"
        className="flex-1 p-3 focus:outline-none"
        placeholder="Research une Question"
      />
      <svg
        onClick={() => onSearch(searchTerm)}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-400 hover:cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  )
}

export default Search
