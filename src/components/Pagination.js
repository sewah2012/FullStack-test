import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({ fetchMore, pageCount }) => {
  const handlePageClick = (data) => {
    fetchMore(data.selected)
    // alert(data.selected)
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      forcePage={pageCount}
      containerClassName="flex justify-evenly my-5 bg-gray-200 p-3 rounded"
      activeClassName="bg-gray-200"
    />
  )
}

export default Pagination
