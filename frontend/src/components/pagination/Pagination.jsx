/* eslint-disable react/prop-types */
import './Pagination.scss'

const Pagination = ({totalPages, page, handleNextPage, handlePreviousPage}) => {
  return (
    <div className="pagination">
      <h2>Don&apos;t know what to search for? Discover: </h2>
      <div className="pagination-btns">
        <button onClick={handlePreviousPage}>Previous</button>
        <p>{page} / {totalPages}</p>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}

export default Pagination;
