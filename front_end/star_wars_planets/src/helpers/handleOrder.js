function handleOrder(arrayToOrder, order) {
  const CHANGE_ORDER = -1;
  const REMAIN_ORDER = 1;
  const { column, sort } = order;
  if (column === 'name') {
    return arrayToOrder.sort((a, b) => (a.name > b.name ? REMAIN_ORDER : CHANGE_ORDER));
  }
  const withoutUnknown = arrayToOrder.filter((planet) => planet[column] !== 'unknown');
  const onlyUnknown = arrayToOrder.filter((planet) => planet[column] === 'unknown');
  if (sort === 'ASC') {
    const ordered = withoutUnknown.sort((a, b) => a[column] - b[column]);
    return [...ordered, ...onlyUnknown]
  }
  const ordered = withoutUnknown.sort((a, b) => b[column] - a[column]);
  return [...ordered, ...onlyUnknown]
}

export default handleOrder;
