export default function setFilteredTableByNumbers(data, filterByNumericValue) {
  const filtersByNumbers = filterByNumericValue.map(({ column, comparison, value }) => {
    if (comparison === 'maior que') {
      return data.filter((planet) => (
        parseInt(planet[column], 10) > parseInt(value, 10)));
    }
    if (comparison === 'menor que') {
      return data.filter((planet) => (
        parseInt(planet[column], 10) < parseInt(value, 10)));
    }
    return data.filter((planet) => (
      parseInt(planet[column], 10) === parseInt(value, 10)));
  });
  const qntOfFilters = filtersByNumbers.length;
  const flatFiltersByNumber = filtersByNumbers.flat(1);
  const resultOfFilters = flatFiltersByNumber.reduce((acc, curr) => {
    if (curr.name in acc) {
      acc[curr.name].quantity += 1;
      return acc;
    }
    return {
      ...acc,
      [curr.name]: {
        object: curr,
        quantity: 1,
      },
    };
  }, {});
  const arrayWithAllFilters = Object.values(resultOfFilters)
    .reduce((acc, { object, quantity }) => {
      if (quantity === qntOfFilters) {
        return acc.concat(object);
      }
      return acc;
    }, []);
  return arrayWithAllFilters;
}
