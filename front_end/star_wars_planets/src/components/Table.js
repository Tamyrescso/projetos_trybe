import React, { useContext, useEffect, useState } from 'react';
import TableContext from '../context/TableContext';
import setTableCells from '../helpers/setTableCells';
import handleOrder from '../helpers/handleOrder';
import './table.css';
import fetchStarWarsPlanets from '../services';

const HEADERS_TABLE = [
  'Name', 'Rotation Period', 'Orbital Period', 'Diameter',
  'Climate', 'Gravity', 'Terrain', 'Surface Water',
  'Population', 'Films', 'Created', 'Edited', 'URL'];

export default function Table() {
  const {
    data,
    setData,
    filterByName: { name },
    setFilteredByName,
    filteredByName,
    filteredByNumericValues,
    filterByNumericValue,
    setFilterByNumericValue,
    categoriesNames,
    setCategoriesNames,
    order,
  } = useContext(TableContext);

  const [planetsToRender, setPlanetsToRender] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [isDisabledP, setIsDisabledP] = useState(true);
  const [isDisabledN, setIsDisabledN] = useState(false);

  useEffect(() => {
    if (nextPage === '') {
      const response = fetchStarWarsPlanets('https://swapi-trybe.herokuapp.com/api/planets/');
        response.then(({results}) => setData(results))
        response.then(({next}) => setNextPage(next))
    }
  }, [nextPage, setData]);

  useEffect(() => {
    setFilteredByName(planetsToRender.filter((item) => item.name.includes(name)));
  }, [name, planetsToRender, setFilteredByName]);

  let newArrayToRender = [];
  if (filteredByNumericValues.length) {
    newArrayToRender = handleOrder(filteredByNumericValues, order);
  } else if (name !== '') {
    newArrayToRender = handleOrder(filteredByName, order);
  } else {
    newArrayToRender = handleOrder(data, order);
  }

  useEffect(() => {
    setPlanetsToRender(newArrayToRender);
  }, [newArrayToRender]);

  const handleDeleteButton = ({ target }) => {
    const arrayAfterFilterDelete = filterByNumericValue.filter(({ column }) => (
      column !== target.id));
    setFilterByNumericValue(arrayAfterFilterDelete);
    setCategoriesNames([...categoriesNames, target.id]);
  };

  const handleNextPrevious = ({target: { id }}) => {
    setIsDisabledP(false)
    setIsDisabledN(false)
    const type = id === 'btn-next'? nextPage : previousPage
    const response = fetchStarWarsPlanets(type);
        response.then(({results}) => setData(results));
        response.then(({next}) => next === null ? setIsDisabledN(true) : setNextPage(next));
        response.then(({previous}) => previous === null ? setIsDisabledP(true) : setPreviousPage(previous));
  }

  const justHeaders = (
    <table className='planets-table'>
      <thead>
        <tr>
          {HEADERS_TABLE.map((header, index) => (
            <th key={ index }>{ header }</th>))}
        </tr>
      </thead>
    </table>
  );

  const filtersUsed = (
    <div>
      {filterByNumericValue.map(({ column }) => (
        <p key={ column } data-testid="filter">
          { column }
          <button type="button" onClick={ handleDeleteButton } id={ column }>x</button>
        </p>
      ))}
    </div>
  );

  if (filterByNumericValue.length && !filteredByNumericValues.length) {
    return (
      <>
        { filtersUsed }
        { justHeaders }
      </>
    );
  }
  if (data.length) {
    return (
      <>
        {filterByNumericValue.length > 0 && filtersUsed}
        <table className='planets-table'>
          <thead>
            <tr>
              {HEADERS_TABLE.map((header, index) => (
                <th key={ index }>{ header }</th>))}
            </tr>
          </thead>
          <tbody>
            {planetsToRender.length
              ? planetsToRender.map((planet) => (
                <tr key={ planet.name } className='rows'>
                  {setTableCells(planet)}
                </tr>
              ))
              : null}
          </tbody>
        </table>
        <div className='control-btn'>
          <button type='button' id='btn-previous' disabled={isDisabledP} onClick={ handleNextPrevious }>Previous</button>
          <button type='button' id='btn-next' disabled={isDisabledN} onClick={ handleNextPrevious }>Next</button>
        </div>
      </>
    );
  }
  return justHeaders;
}
