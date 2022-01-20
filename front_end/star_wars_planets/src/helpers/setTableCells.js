// import React from 'react';

const setTableCells = (planet) => {
  delete planet.residents;
  return Object.entries(planet).reduce((acc, curr) => {
    let header = '';
    if (curr[0] === 'url') {
      header = curr[0].toUpperCase();
    } else if (curr[0].includes('_')) {
      header = curr[0].split('_').join(' ');
    }
    const capitalized = header? header[0].toUpperCase() + header.slice(1) : curr[0][0].toUpperCase() + curr[0].slice(1);
    return {
      ...acc,
      [capitalized]: curr[1],
    }
    // if (index === 0) {
    //   return (
    //     <td key={ `${planet.name}${index}` } data-testid="planet-name" className='cells'>
    //       {typeof item === 'string' ? item : item.join(' ')}
    //     </td>
    //   );
    // }
    // return (
    //   <td key={ `${planet.name}${index}` } className='cells'>
    //     {typeof item === 'string' ? item : item.join(' ')}
    //   </td>
    // );
  }, {});
};

export default setTableCells;
