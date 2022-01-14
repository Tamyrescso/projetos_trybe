import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
import './filterByName.css';

function FilterByName() {
  const { setFilterByName } = useContext(TableContext);
  const getInputName = ({ target: { value } }) => {
    setFilterByName({ name: value });
  };
  return (
    <div>
      <h4 className='instruction'>Filtre por nome</h4>
      <input
      type="text"
      onChange={ getInputName }
      data-testid="name-filter"
      className='input-name'
    />
    </div>
  );
}

export default FilterByName;
