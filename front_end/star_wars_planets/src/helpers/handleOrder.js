function handleOrder(arrayToOrder, order) {
  const CHANGE_ORDER = -1;
  const REMAIN_ORDER = 1;
  const { column, sort } = order;
  if (column === 'name') {
    return arrayToOrder.sort((a, b) => (a.name > b.name ? REMAIN_ORDER : CHANGE_ORDER));
  }
  if (sort === 'ASC') {
    return arrayToOrder.sort((a, b) => a[column] - b[column]);
  }
  return arrayToOrder.sort((a, b) => b[column] - a[column]);
}

export default handleOrder;
