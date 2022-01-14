export async function getCategories() {
  const endpoint = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  return endpoint.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endpoint = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  return endpoint.json();
}
