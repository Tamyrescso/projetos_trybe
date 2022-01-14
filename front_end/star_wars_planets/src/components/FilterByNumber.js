import React, { useContext, useEffect, useState } from 'react';
import TableContext from '../context/TableContext';
import setFilteredTableByNumbers from '../helpers/setFilteredTableByNumbers';
import './filterByNumber.css';

function FilterByNumber() {
  const { setFilterByNumericValue,
    filterByNumericValue,
    data,
    setFilteredByNumericValues,
    categoriesNames,
    setCategoriesNames,
  } = useContext(TableContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [inputValue, setValue] = useState(0);

  const handleSelect = ({ target: { name, value } }) => {
    if (name === 'category') {
      setColumn(value);
    } else if (name === 'comparison') {
      setComparison(value);
    } else {
      setValue(value);
    }
  };
  const handleClick = () => {
    setFilterByNumericValue([...filterByNumericValue,
      { column, comparison, value: inputValue }]);
    const deleteUsedFilter = categoriesNames.filter((category) => category !== column);
    setCategoriesNames(deleteUsedFilter);
    if (deleteUsedFilter.length === 0) {
      setColumn('');
    } else {
      setColumn(deleteUsedFilter[0]);
    }
  };

  useEffect(() => {
    const arrayToRender = (setFilteredTableByNumbers(data, filterByNumericValue));
    setFilteredByNumericValues(arrayToRender);
  }, [filterByNumericValue, data, setFilteredByNumericValues]);

  return (
    <form className='form-number-filter'>
      <select
        data-testid="column-filter"
        onChange={ handleSelect }
        name="category"
      >
        {categoriesNames.map((category) => (
          <option key={ category } value={ category }>{category}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ handleSelect }
        name="comparison"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        onChange={ handleSelect }
        data-testid="value-filter"
        name="value"
        value={ inputValue }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
        className='btn-filter'
      >
        Filtrar
      </button>
    </form>
  );
}

export default FilterByNumber;
