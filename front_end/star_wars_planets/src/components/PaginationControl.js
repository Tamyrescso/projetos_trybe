import React from 'react';
import './paginationControl.css';

function PaginationControl({ handlePageClick, pageNumbers }) {
  return <div>
    <ul id='page-numbers'>
      {pageNumbers.map((number => (
        <li
        key={number}
        id={number}
        onClick={handlePageClick}
      >
        {number}
      </li>
      )))}
    </ul>
  </div>;
}

export default PaginationControl;
