import React, { useState, useEffect } from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import FilterByName from './components/FilterByName';
import FilterByNumber from './components/FilterByNumber';
import FilterByOrder from './components/FilterByOrder';
import Opening from './components/Opening';
import star from'./images/star.svg';
import wars from'./images/wars.svg';

function App() {
  const [showTable, setShowTable] = useState(false);
  useEffect(() => {
    const SECONDS = 3000;
    const intervalId = setInterval(() => {
      setShowTable(true)
    }, SECONDS)
    return () => {
      clearInterval(intervalId);
      setShowTable(false)
    }
  }, [])
  return (
    <>
      {showTable
        ? (
            <Provider>
              <div className='title-container'>
                <img src={star} alt="Star" className='title'/>
                <img src={wars} alt="Wars" className='title'/>
              </div>
              <FilterByName />
              <div className='main-filters'>
                <FilterByNumber />
                <FilterByOrder />
              </div>
              <Table />
            </Provider>
          )
        : <Opening />
      }
    </>
  );
}

export default App;
