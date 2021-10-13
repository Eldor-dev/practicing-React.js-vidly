import React from 'react';
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({itemCount, pageSize, onPageChange, currentPage}) => {
    
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1)

    return (  <nav>
    <ul className="pagination">
      {pages.map(page => <li key={page}  className={currentPage === page ? "page-item active": "page-item"} onClick={() => onPageChange(page)}>
        <a className='page-link' href="#1">{page}</a>
      </li>)}
    </ul>
  </nav>);
}

Pagination.propTypes = {
  itemCount: 
    PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired, 
    currentPage: PropTypes.number.isRequired
}
 
export default Pagination;