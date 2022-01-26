import React from 'react';

const setTableCells = (planet) => {
  delete planet.residents;
  return Object.values(planet).map((item, index) => {
    if (index === 0) {
      return (
        <td key={ `${planet.name}${index}` } data-testid="planet-name" className='cells'>
          {typeof item === 'string' ? item : item.join(' ')}
        </td>
      );
    }
    return (
      <td key={ `${planet.name}${index}` } className='cells'>
        {typeof item === 'string' ? item : item.join(' ')}
      </td>
    );
  });
};

export default setTableCells;
