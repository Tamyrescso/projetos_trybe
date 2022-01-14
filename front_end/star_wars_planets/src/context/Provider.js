import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

const CATEGORY_NAME = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredByName, setFilteredByName] = useState([]);
  const [filterByNumericValue, setFilterByNumericValue] = useState([]);
  const [filteredByNumericValues, setFilteredByNumericValues] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState(CATEGORY_NAME);
  const [order, setOrder] = useState({ column: 'name', sort: 'ASC' });

  const contextValues = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filteredByName,
    setFilteredByName,
    filterByNumericValue,
    setFilterByNumericValue,
    filteredByNumericValues,
    setFilteredByNumericValues,
    categoriesNames,
    setCategoriesNames,
    order,
    setOrder,
  };

  return (
    <TableContext.Provider value={ contextValues }>
      {children}
    </TableContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Provider;
