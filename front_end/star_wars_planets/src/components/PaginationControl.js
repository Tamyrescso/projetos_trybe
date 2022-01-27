import React from 'react';
import './paginationControl.css';

function PaginationControl({ handlePageClick, pageNumbers, activePage }) {
  return <div>
    <ul id='page-numbers'>
      {pageNumbers.map((number => (
        <li
        key={number}
        id={number}
        onClick={handlePageClick}
        className={parseInt(activePage) === number? 'active' : 'not-active'}
      >
        {number}
      </li>
      )))}
    </ul>
  </div>;
}

export default PaginationControl;
