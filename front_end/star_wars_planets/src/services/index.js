// const fetchStarWarsPlanets = () => (
//   fetch('https://swapi-trybe.herokuapp.com/api/planets/')
//     .then((response) => (
//       response
//         .json()
//         .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
//     ))
// );

export async function fetchStarWarsPlanets(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export default fetchStarWarsPlanets;