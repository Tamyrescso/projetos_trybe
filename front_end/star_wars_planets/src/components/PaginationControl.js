import React from 'react';

function PaginationControl({ handlePageClick, pageNumbers }) {
  return <div>
    <ul>
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
