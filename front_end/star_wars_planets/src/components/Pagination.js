import React from 'react'
import { TablePagination } from 'react-pagination-table';

function Pagination({ data, headers }) {
  return (
    <div>
      <TablePagination
        headers={ headers }
        data={ data }
        columns="Name.Rotation period.Orbital period.Diameter.Climate.Gravity.Terrain.Surface water.Population.Films.Created.Edited.URL"
        perPageItemCount={ 15 }
        // partialPageCount={ 3 }
        totalCount={ data.length }
        // arrayOption={ [['size', 'all', ' ']] }
        nextPageText="Next"
        prePageText="Prev"
      />
    </div>
  )
}

export default Pagination
