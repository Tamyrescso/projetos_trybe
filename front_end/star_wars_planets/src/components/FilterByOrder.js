import React, { useContext, useState } from 'react';
import TableContext from '../context/TableContext';
import './filterByOrder.css';

const ORDER_FILTERS = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

function FilterByOrder() {
  const { setOrder } = useContext(TableContext);

  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('ASC');

  return (
    <form className='form-order-filter'>
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => setColumn(target.value) }
        id="column"
      >
        {ORDER_FILTERS.map((filter) => (
          <option key={ filter } value={ filter }>{filter}</option>
        ))}
      </select>
      <label htmlFor="ASC">
        Ascendente:
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          id="ASC"
          value="ASC"
          name="order"
          onChange={ ({ target }) => setSort(target.value) }
        />
      </label>
      <label htmlFor="DESC">
        Descendente:
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          id="DESC"
          value="DESC"
          name="order"
          onChange={ ({ target }) => setSort(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setOrder({ column, sort }) }
        className='btn-filter'
      >
        Ordenar
      </button>
    </form>
  );
}

export default FilterByOrder;
