import React, { useContext, useEffect, useState } from 'react';
import TableContext from '../context/TableContext';
import setTableCells from '../helpers/setTableCells';
import handleOrder from '../helpers/handleOrder';
import Loading from './Loading';
import './table.css';
import fetchStarWarsPlanets from '../services';
import PaginationControl from './PaginationControl';

//A paginação foi baseada no código: https://codepen.io/PiotrBerebecki/pen/pEYPbY
const PER_PAGE = 10;


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
  const [fetchingPlanets, setFetchingPlanets] = useState([]);
  const [nextFetchingPage, setNextFetchingPage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlanets, setCurrentPlanets] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (nextFetchingPage === '') {
      const response = fetchStarWarsPlanets('https://swapi-trybe.herokuapp.com/api/planets/');
        response.then(({next}) => setNextFetchingPage(next))
        response.then(({results}) => setFetchingPlanets(results))
    } else if (nextFetchingPage !== null && nextFetchingPage !== '') {
      const response = fetchStarWarsPlanets(nextFetchingPage);
        response.then(({next}) => setNextFetchingPage(next))
        response.then(({results}) => setFetchingPlanets([...fetchingPlanets, ...results]))
    } else {
      setData(fetchingPlanets)
    }
  }, [fetchingPlanets, setFetchingPlanets]);

  

  useEffect(() => {
    setFilteredByName(planetsToRender.filter((item) => item.name.includes(name)));
  }, [name]);

  useEffect(() => {
    let newArrayToRender = [];
    if (filteredByNumericValues.length) {
      newArrayToRender = handleOrder(filteredByNumericValues, order);
    } else if (name !== '') {
      newArrayToRender = handleOrder(filteredByName, order);
    } else {
      newArrayToRender = handleOrder(data, order);
    }

    setPlanetsToRender(newArrayToRender);
  }, [data, filteredByNumericValues, filteredByName, order])

  const handleDeleteButton = ({ target }) => {
    const arrayAfterFilterDelete = filterByNumericValue.filter(({ column }) => (
      column !== target.id));
    setFilterByNumericValue(arrayAfterFilterDelete);
    setCategoriesNames([...categoriesNames, target.id]);
  };

  const handlePageClick = ({target: { id }}) => {
    setActivePage(id)
    setCurrentPage(id)
  }

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

  useEffect(() => {
    if (planetsToRender.length) {
      const indexOfLastPlanet = currentPage * PER_PAGE;
      const indexOfFirstPlanet = indexOfLastPlanet - PER_PAGE;
      const createCurrentPlanets = planetsToRender.slice(indexOfFirstPlanet, indexOfLastPlanet);
      const newPageNumbers = [];
      for (let i = 1; i <= Math.ceil(planetsToRender.length / PER_PAGE); i++) {
        newPageNumbers.push(i);
      }
      setCurrentPlanets(createCurrentPlanets);
      setPageNumbers(newPageNumbers);
      setIsLoading(false);
    }
  }, [currentPage, planetsToRender, order])

  if (currentPlanets.length > 0 && !isLoading) {
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
            {currentPlanets.map((planet) => 
              (
                <tr key={ planet.name } className='rows'>
                  {setTableCells(planet)}
                </tr>
              ))
            }
          </tbody>
        </table>
        <PaginationControl
          pageNumbers={pageNumbers}
          handlePageClick={handlePageClick}
          activePage={activePage}
        />
      </>
    );
  }
  return <Loading />
}
