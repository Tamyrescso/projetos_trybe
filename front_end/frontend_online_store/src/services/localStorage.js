export function onHandleClick(item, quantity) {
  const products = JSON.parse(localStorage.getItem('item'));
  const one = 1;
  const sameProduct = products.some((product) => product[0] === item.title);
  if (products.length === 0 || !sameProduct) {
    const newProduct = [
      item.title,
      (quantity === 'one' ? one : quantity),
      item.price,
      item.thumbnail,
      item.available_quantity];
    localStorage.setItem('item', JSON.stringify([...products, newProduct]));
  }

  products.find((product, index) => {
    if (product[0] === item.title) {
      const rightQuantity = quantity === 'one' ? one + product[1] : quantity;
      products.splice(index, 1, [
        product[0],
        rightQuantity,
        product[2],
        product[3],
      ]);
      return localStorage.setItem('item', JSON.stringify([...products]));
    }
    return null;
  });
}

export function getItemLocalStorage() {
  return JSON.parse(localStorage.getItem('item'));
}

export function setItemLocalStorage(productArray) {
  localStorage.setItem('item', JSON.stringify(productArray));
}

export function setItemDefaultLocalStorage() {
  localStorage.setItem('item', JSON.stringify([]));
}

export function removeItem(productItem) {
  const products = getItemLocalStorage();
  setItemLocalStorage(
    products.filter((product) => product[0] !== productItem[0]),
  );
}

export function addSubItem(productItem, sign) {
  const products = getItemLocalStorage();
  const productElement = products.find(
    (product) => product[0] === productItem[0],
  );
  if (sign === '+') {
    productElement[1] += 1;
  } else {
    productElement[1] -= 1;
  }
  setItemLocalStorage(products);
}
