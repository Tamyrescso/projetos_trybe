import React, { useContext, useEffect, useState } from 'react';
import TableContext from '../context/TableContext';
import setTableCells from '../helpers/setTableCells';
import handleOrder from '../helpers/handleOrder';
import Loading from '../components/Loading';
import './table.css';
import fetchStarWarsPlanets from '../services';
import Pagination from './Pagination';

const HEADERS_TABLE = [
  'Name', 'Rotation period', 'Orbital period', 'Diameter',
  'Climate', 'Gravity', 'Terrain', 'Surface water',
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
      setIsLoading(false)
    }
  }, [fetchingPlanets]);

  

  useEffect(() => {
    setFilteredByName(planetsToRender.filter((item) => item.name.includes(name)));
  }, [name, planetsToRender, setFilteredByName]);

  let newArrayToRender = [];
  if (filteredByNumericValues.length) {
    newArrayToRender = handleOrder(filteredByNumericValues, order);
  } else if (name !== '') {
    newArrayToRender = handleOrder(filteredByName, order);
  } else {
    newArrayToRender = handleOrder(data, order);
  }

  useEffect(() => {
    setPlanetsToRender(newArrayToRender);
  }, [newArrayToRender]);

  const handleDeleteButton = ({ target }) => {
    const arrayAfterFilterDelete = filterByNumericValue.filter(({ column }) => (
      column !== target.id));
    setFilterByNumericValue(arrayAfterFilterDelete);
    setCategoriesNames([...categoriesNames, target.id]);
  };

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

  const dataPlanets = [
    {
        "Name": "Alderaan",
        "Rotation period": "24",
        "Orbital period": "364",
        "Diameter": "12500",
        "Climate": "temperate",
        "Gravity": "1 standard",
        "Terrain": "grasslands, mountains",
        "Surface water": "40",
        "Population": "2000000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/1/",
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T11:35:48.479000Z",
        "Edited": "2014-12-20T20:58:18.420000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/2/"
    },
    {
        "Name": "Aleen Minor",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "unknown",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T09:52:23.452000Z",
        "Edited": "2014-12-20T20:58:18.483000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/38/"
    },
    {
        "Name": "Bespin",
        "Rotation period": "12",
        "Orbital period": "5110",
        "Diameter": "118000",
        "Climate": "temperate",
        "Gravity": "1.5 (surface), 1 standard (Cloud City)",
        "Terrain": "gas giant",
        "Surface water": "0",
        "Population": "6000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/2/"
        ],
        "Created": "2014-12-10T11:43:55.240000Z",
        "Edited": "2014-12-20T20:58:18.427000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/6/"
    },
    {
        "Name": "Bestine IV",
        "Rotation period": "26",
        "Orbital period": "680",
        "Diameter": "6400",
        "Climate": "temperate",
        "Gravity": "unknown",
        "Terrain": "rocky islands, oceans",
        "Surface water": "98",
        "Population": "62000000",
        "Films": [],
        "Created": "2014-12-12T11:16:55.078000Z",
        "Edited": "2014-12-20T20:58:18.463000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/26/"
    },
    {
        "Name": "Cato Neimoidia",
        "Rotation period": "25",
        "Orbital period": "278",
        "Diameter": "0",
        "Climate": "temperate, moist",
        "Gravity": "1 standard",
        "Terrain": "mountains, fields, forests, rock arches",
        "Surface water": "unknown",
        "Population": "10000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T13:46:28.704000Z",
        "Edited": "2014-12-20T20:58:18.449000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/18/"
    },
    {
        "Name": "Cerea",
        "Rotation period": "27",
        "Orbital period": "386",
        "Diameter": "unknown",
        "Climate": "temperate",
        "Gravity": "1",
        "Terrain": "verdant",
        "Surface water": "20",
        "Population": "450000000",
        "Films": [],
        "Created": "2014-12-20T10:14:48.178000Z",
        "Edited": "2014-12-20T20:58:18.493000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/43/"
    },
    {
        "Name": "Champala",
        "Rotation period": "27",
        "Orbital period": "318",
        "Diameter": "unknown",
        "Climate": "temperate",
        "Gravity": "1",
        "Terrain": "oceans, rainforests, plateaus",
        "Surface water": "unknown",
        "Population": "3500000000",
        "Films": [],
        "Created": "2014-12-20T10:52:51.524000Z",
        "Edited": "2014-12-20T20:58:18.506000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/50/"
    },
    {
        "Name": "Chandrila",
        "Rotation period": "20",
        "Orbital period": "368",
        "Diameter": "13500",
        "Climate": "temperate",
        "Gravity": "1",
        "Terrain": "plains, forests",
        "Surface water": "40",
        "Population": "1200000000",
        "Films": [],
        "Created": "2014-12-18T11:11:51.872000Z",
        "Edited": "2014-12-20T20:58:18.472000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/32/"
    },
    {
        "Name": "Concord Dawn",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "jungles, forests, deserts",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T16:54:39.909000Z",
        "Edited": "2014-12-20T20:58:18.512000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/53/"
    },
    {
        "Name": "Corellia",
        "Rotation period": "25",
        "Orbital period": "329",
        "Diameter": "11000",
        "Climate": "temperate",
        "Gravity": "1 standard",
        "Terrain": "plains, urban, hills, forests",
        "Surface water": "70",
        "Population": "3000000000",
        "Films": [],
        "Created": "2014-12-10T16:49:12.453000Z",
        "Edited": "2014-12-20T20:58:18.456000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/22/"
    },
    {
        "Name": "Coruscant",
        "Rotation period": "24",
        "Orbital period": "368",
        "Diameter": "12240",
        "Climate": "temperate",
        "Gravity": "1 standard",
        "Terrain": "cityscape, mountains",
        "Surface water": "unknown",
        "Population": "1000000000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/3/",
            "https://swapi-trybe.herokuapp.com/api/films/4/",
            "https://swapi-trybe.herokuapp.com/api/films/5/",
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T11:54:13.921000Z",
        "Edited": "2014-12-20T20:58:18.432000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/9/"
    },
    {
        "Name": "Dagobah",
        "Rotation period": "23",
        "Orbital period": "341",
        "Diameter": "8900",
        "Climate": "murky",
        "Gravity": "N/A",
        "Terrain": "swamp, jungles",
        "Surface water": "8",
        "Population": "unknown",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/2/",
            "https://swapi-trybe.herokuapp.com/api/films/3/",
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T11:42:22.590000Z",
        "Edited": "2014-12-20T20:58:18.425000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/5/"
    },
    {
        "Name": "Dantooine",
        "Rotation period": "25",
        "Orbital period": "378",
        "Diameter": "9830",
        "Climate": "temperate",
        "Gravity": "1 standard",
        "Terrain": "oceans, savannas, mountains, grasslands",
        "Surface water": "unknown",
        "Population": "1000",
        "Films": [],
        "Created": "2014-12-10T17:23:29.896000Z",
        "Edited": "2014-12-20T20:58:18.461000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/25/"
    },
    {
        "Name": "Dathomir",
        "Rotation period": "24",
        "Orbital period": "491",
        "Diameter": "10480",
        "Climate": "temperate",
        "Gravity": "0.9",
        "Terrain": "forests, deserts, savannas",
        "Surface water": "unknown",
        "Population": "5200",
        "Films": [],
        "Created": "2014-12-19T18:00:40.142000Z",
        "Edited": "2014-12-20T20:58:18.480000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/36/"
    },
    {
        "Name": "Dorin",
        "Rotation period": "22",
        "Orbital period": "409",
        "Diameter": "13400",
        "Climate": "temperate",
        "Gravity": "1",
        "Terrain": "unknown",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T10:48:36.141000Z",
        "Edited": "2014-12-20T20:58:18.504000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/49/"
    },
    {
        "Name": "Endor",
        "Rotation period": "18",
        "Orbital period": "402",
        "Diameter": "4900",
        "Climate": "temperate",
        "Gravity": "0.85 standard",
        "Terrain": "forests, mountains, lakes",
        "Surface water": "8",
        "Population": "30000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/3/"
        ],
        "Created": "2014-12-10T11:50:29.349000Z",
        "Edited": "2014-12-20T20:58:18.429000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/7/"
    },
    {
        "Name": "Eriadu",
        "Rotation period": "24",
        "Orbital period": "360",
        "Diameter": "13490",
        "Climate": "polluted",
        "Gravity": "1 standard",
        "Terrain": "cityscape",
        "Surface water": "unknown",
        "Population": "22000000000",
        "Films": [],
        "Created": "2014-12-10T16:26:54.384000Z",
        "Edited": "2014-12-20T20:58:18.454000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/21/"
    },
    {
        "Name": "Felucia",
        "Rotation period": "34",
        "Orbital period": "231",
        "Diameter": "9100",
        "Climate": "hot, humid",
        "Gravity": "0.75 standard",
        "Terrain": "fungus forests",
        "Surface water": "unknown",
        "Population": "8500000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T13:44:50.397000Z",
        "Edited": "2014-12-20T20:58:18.447000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/17/"
    },
    {
        "Name": "Geonosis",
        "Rotation period": "30",
        "Orbital period": "256",
        "Diameter": "11370",
        "Climate": "temperate, arid",
        "Gravity": "0.9 standard",
        "Terrain": "rock, desert, mountain, barren",
        "Surface water": "5",
        "Population": "100000000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/5/"
        ],
        "Created": "2014-12-10T12:47:22.350000Z",
        "Edited": "2014-12-20T20:58:18.437000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/11/"
    },
    {
        "Name": "Glee Anselm",
        "Rotation period": "33",
        "Orbital period": "206",
        "Diameter": "15600",
        "Climate": "tropical, temperate",
        "Gravity": "1",
        "Terrain": "lakes, islands, swamps, seas",
        "Surface water": "80",
        "Population": "500000000",
        "Films": [],
        "Created": "2014-12-20T10:18:26.110000Z",
        "Edited": "2014-12-20T20:58:18.495000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/44/"
    },
    {
        "Name": "Haruun Kal",
        "Rotation period": "25",
        "Orbital period": "383",
        "Diameter": "10120",
        "Climate": "temperate",
        "Gravity": "0.98",
        "Terrain": "toxic cloudsea, plateaus, volcanoes",
        "Surface water": "unknown",
        "Population": "705300",
        "Films": [],
        "Created": "2014-12-20T10:12:28.980000Z",
        "Edited": "2014-12-20T20:58:18.491000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/42/"
    },
    {
        "Name": "Hoth",
        "Rotation period": "23",
        "Orbital period": "549",
        "Diameter": "7200",
        "Climate": "frozen",
        "Gravity": "1.1 standard",
        "Terrain": "tundra, ice caves, mountain ranges",
        "Surface water": "100",
        "Population": "unknown",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/2/"
        ],
        "Created": "2014-12-10T11:39:13.934000Z",
        "Edited": "2014-12-20T20:58:18.423000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/4/"
    },
    {
        "Name": "Iktotch",
        "Rotation period": "22",
        "Orbital period": "481",
        "Diameter": "unknown",
        "Climate": "arid, rocky, windy",
        "Gravity": "1",
        "Terrain": "rocky",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T10:31:32.413000Z",
        "Edited": "2014-12-20T20:58:18.500000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/47/"
    },
    {
        "Name": "Iridonia",
        "Rotation period": "29",
        "Orbital period": "413",
        "Diameter": "unknown",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "rocky canyons, acid pools",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T10:26:05.788000Z",
        "Edited": "2014-12-20T20:58:18.497000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/45/"
    },
    {
        "Name": "Kalee",
        "Rotation period": "23",
        "Orbital period": "378",
        "Diameter": "13850",
        "Climate": "arid, temperate, tropical",
        "Gravity": "1",
        "Terrain": "rainforests, cliffs, canyons, seas",
        "Surface water": "unknown",
        "Population": "4000000000",
        "Films": [],
        "Created": "2014-12-20T19:43:51.278000Z",
        "Edited": "2014-12-20T20:58:18.523000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/59/"
    },
    {
        "Name": "Kamino",
        "Rotation period": "27",
        "Orbital period": "463",
        "Diameter": "19720",
        "Climate": "temperate",
        "Gravity": "1 standard",
        "Terrain": "ocean",
        "Surface water": "100",
        "Population": "1000000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/5/"
        ],
        "Created": "2014-12-10T12:45:06.577000Z",
        "Edited": "2014-12-20T20:58:18.434000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/10/"
    },
    {
        "Name": "Kashyyyk",
        "Rotation period": "26",
        "Orbital period": "381",
        "Diameter": "12765",
        "Climate": "tropical",
        "Gravity": "1 standard",
        "Terrain": "jungle, forests, lakes, rivers",
        "Surface water": "60",
        "Population": "45000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T13:32:00.124000Z",
        "Edited": "2014-12-20T20:58:18.442000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/14/"
    },
    {
        "Name": "Malastare",
        "Rotation period": "26",
        "Orbital period": "201",
        "Diameter": "18880",
        "Climate": "arid, temperate, tropical",
        "Gravity": "1.56",
        "Terrain": "swamps, deserts, jungles, mountains",
        "Surface water": "unknown",
        "Population": "2000000000",
        "Films": [],
        "Created": "2014-12-19T17:52:13.106000Z",
        "Edited": "2014-12-20T20:58:18.478000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/35/"
    },
    {
        "Name": "Mirial",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "deserts",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T16:44:46.318000Z",
        "Edited": "2014-12-20T20:58:18.508000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/51/"
    },
    {
        "Name": "Mon Cala",
        "Rotation period": "21",
        "Orbital period": "398",
        "Diameter": "11030",
        "Climate": "temperate",
        "Gravity": "1",
        "Terrain": "oceans, reefs, islands",
        "Surface water": "100",
        "Population": "27000000000",
        "Films": [],
        "Created": "2014-12-18T11:07:01.792000Z",
        "Edited": "2014-12-20T20:58:18.471000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/31/"
    },
    {
        "Name": "Mustafar",
        "Rotation period": "36",
        "Orbital period": "412",
        "Diameter": "4200",
        "Climate": "hot",
        "Gravity": "1 standard",
        "Terrain": "volcanoes, lava rivers, mountains, caves",
        "Surface water": "0",
        "Population": "20000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T12:50:16.526000Z",
        "Edited": "2014-12-20T20:58:18.440000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/13/"
    },
    {
        "Name": "Muunilinst",
        "Rotation period": "28",
        "Orbital period": "412",
        "Diameter": "13800",
        "Climate": "temperate",
        "Gravity": "1",
        "Terrain": "plains, forests, hills, mountains",
        "Surface water": "25",
        "Population": "5000000000",
        "Films": [],
        "Created": "2014-12-20T17:57:47.420000Z",
        "Edited": "2014-12-20T20:58:18.519000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/57/"
    },
    {
        "Name": "Mygeeto",
        "Rotation period": "12",
        "Orbital period": "167",
        "Diameter": "10088",
        "Climate": "frigid",
        "Gravity": "1 standard",
        "Terrain": "glaciers, mountains, ice canyons",
        "Surface water": "unknown",
        "Population": "19000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T13:43:39.139000Z",
        "Edited": "2014-12-20T20:58:18.446000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/16/"
    },
    {
        "Name": "Naboo",
        "Rotation period": "26",
        "Orbital period": "312",
        "Diameter": "12120",
        "Climate": "temperate",
        "Gravity": "1 standard",
        "Terrain": "grassy hills, swamps, forests, mountains",
        "Surface water": "12",
        "Population": "4500000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/3/",
            "https://swapi-trybe.herokuapp.com/api/films/4/",
            "https://swapi-trybe.herokuapp.com/api/films/5/",
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T11:52:31.066000Z",
        "Edited": "2014-12-20T20:58:18.430000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/8/"
    },
    {
        "Name": "Nal Hutta",
        "Rotation period": "87",
        "Orbital period": "413",
        "Diameter": "12150",
        "Climate": "temperate",
        "Gravity": "1 standard",
        "Terrain": "urban, oceans, swamps, bogs",
        "Surface water": "unknown",
        "Population": "7000000000",
        "Films": [],
        "Created": "2014-12-10T17:11:29.452000Z",
        "Edited": "2014-12-20T20:58:18.460000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/24/"
    },
    {
        "Name": "Ojom",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "frigid",
        "Gravity": "unknown",
        "Terrain": "oceans, glaciers",
        "Surface water": "100",
        "Population": "500000000",
        "Films": [],
        "Created": "2014-12-20T17:27:41.286000Z",
        "Edited": "2014-12-20T20:58:18.516000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/55/"
    },
    {
        "Name": "Ord Mantell",
        "Rotation period": "26",
        "Orbital period": "334",
        "Diameter": "14050",
        "Climate": "temperate",
        "Gravity": "1 standard",
        "Terrain": "plains, seas, mesas",
        "Surface water": "10",
        "Population": "4000000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/2/"
        ],
        "Created": "2014-12-15T12:23:41.661000Z",
        "Edited": "2014-12-20T20:58:18.464000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/27/"
    },
    {
        "Name": "Polis Massa",
        "Rotation period": "24",
        "Orbital period": "590",
        "Diameter": "0",
        "Climate": "artificial temperate ",
        "Gravity": "0.56 standard",
        "Terrain": "airless asteroid",
        "Surface water": "0",
        "Population": "1000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T13:33:46.405000Z",
        "Edited": "2014-12-20T20:58:18.444000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/15/"
    },
    {
        "Name": "Quermia",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "unknown",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T10:34:08.249000Z",
        "Edited": "2014-12-20T20:58:18.502000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/48/"
    },
    {
        "Name": "Rodia",
        "Rotation period": "29",
        "Orbital period": "305",
        "Diameter": "7549",
        "Climate": "hot",
        "Gravity": "1 standard",
        "Terrain": "jungles, oceans, urban, swamps",
        "Surface water": "60",
        "Population": "1300000000",
        "Films": [],
        "Created": "2014-12-10T17:03:28.110000Z",
        "Edited": "2014-12-20T20:58:18.458000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/23/"
    },
    {
        "Name": "Ryloth",
        "Rotation period": "30",
        "Orbital period": "305",
        "Diameter": "10600",
        "Climate": "temperate, arid, subartic",
        "Gravity": "1",
        "Terrain": "mountains, valleys, deserts, tundra",
        "Surface water": "5",
        "Population": "1500000000",
        "Films": [],
        "Created": "2014-12-20T09:46:25.740000Z",
        "Edited": "2014-12-20T20:58:18.481000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/37/"
    },
    {
        "Name": "Saleucami",
        "Rotation period": "26",
        "Orbital period": "392",
        "Diameter": "14920",
        "Climate": "hot",
        "Gravity": "unknown",
        "Terrain": "caves, desert, mountains, volcanoes",
        "Surface water": "unknown",
        "Population": "1400000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T13:47:46.874000Z",
        "Edited": "2014-12-20T20:58:18.450000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/19/"
    },
    {
        "Name": "Serenno",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "rainforests, rivers, mountains",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T16:52:13.357000Z",
        "Edited": "2014-12-20T20:58:18.510000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/52/"
    },
    {
        "Name": "Shili",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "temperate",
        "Gravity": "1",
        "Terrain": "cities, savannahs, seas, plains",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T18:43:14.049000Z",
        "Edited": "2014-12-20T20:58:18.521000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/58/"
    },
    {
        "Name": "Skako",
        "Rotation period": "27",
        "Orbital period": "384",
        "Diameter": "unknown",
        "Climate": "temperate",
        "Gravity": "1",
        "Terrain": "urban, vines",
        "Surface water": "unknown",
        "Population": "500000000000",
        "Films": [],
        "Created": "2014-12-20T17:50:47.864000Z",
        "Edited": "2014-12-20T20:58:18.517000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/56/"
    },
    {
        "Name": "Socorro",
        "Rotation period": "20",
        "Orbital period": "326",
        "Diameter": "0",
        "Climate": "arid",
        "Gravity": "1 standard",
        "Terrain": "deserts, mountains",
        "Surface water": "unknown",
        "Population": "300000000",
        "Films": [],
        "Created": "2014-12-15T12:56:31.121000Z",
        "Edited": "2014-12-20T20:58:18.469000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/30/"
    },
    {
        "Name": "Stewjon",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "0",
        "Climate": "temperate",
        "Gravity": "1 standard",
        "Terrain": "grass",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-10T16:16:26.566000Z",
        "Edited": "2014-12-20T20:58:18.452000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/20/"
    },
    {
        "Name": "Sullust",
        "Rotation period": "20",
        "Orbital period": "263",
        "Diameter": "12780",
        "Climate": "superheated",
        "Gravity": "1",
        "Terrain": "mountains, volcanoes, rocky deserts",
        "Surface water": "5",
        "Population": "18500000000",
        "Films": [],
        "Created": "2014-12-18T11:25:40.243000Z",
        "Edited": "2014-12-20T20:58:18.474000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/33/"
    },
    {
        "Name": "Tatooine",
        "Rotation period": "23",
        "Orbital period": "304",
        "Diameter": "10465",
        "Climate": "arid",
        "Gravity": "1 standard",
        "Terrain": "desert",
        "Surface water": "1",
        "Population": "200000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/1/",
            "https://swapi-trybe.herokuapp.com/api/films/3/",
            "https://swapi-trybe.herokuapp.com/api/films/4/",
            "https://swapi-trybe.herokuapp.com/api/films/5/",
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-09T13:50:49.641000Z",
        "Edited": "2014-12-20T20:58:18.411000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/1/"
    },
    {
        "Name": "Tholoth",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "unknown",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T10:28:31.117000Z",
        "Edited": "2014-12-20T20:58:18.498000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/46/"
    },
    {
        "Name": "Toydaria",
        "Rotation period": "21",
        "Orbital period": "184",
        "Diameter": "7900",
        "Climate": "temperate",
        "Gravity": "1",
        "Terrain": "swamps, lakes",
        "Surface water": "unknown",
        "Population": "11000000",
        "Films": [],
        "Created": "2014-12-19T17:47:54.403000Z",
        "Edited": "2014-12-20T20:58:18.476000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/34/"
    },
    {
        "Name": "Trandosha",
        "Rotation period": "25",
        "Orbital period": "371",
        "Diameter": "0",
        "Climate": "arid",
        "Gravity": "0.62 standard",
        "Terrain": "mountains, seas, grasslands, deserts",
        "Surface water": "unknown",
        "Population": "42000000",
        "Films": [],
        "Created": "2014-12-15T12:53:47.695000Z",
        "Edited": "2014-12-20T20:58:18.468000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/29/"
    },
    {
        "Name": "Troiken",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "desert, tundra, rainforests, mountains",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T10:01:37.395000Z",
        "Edited": "2014-12-20T20:58:18.487000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/40/"
    },
    {
        "Name": "Tund",
        "Rotation period": "48",
        "Orbital period": "1770",
        "Diameter": "12190",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "barren, ash",
        "Surface water": "unknown",
        "Population": "0",
        "Films": [],
        "Created": "2014-12-20T10:07:29.578000Z",
        "Edited": "2014-12-20T20:58:18.489000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/41/"
    },
    {
        "Name": "Umbara",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "unknown",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T20:18:36.256000Z",
        "Edited": "2014-12-20T20:58:18.525000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/60/"
    },
    {
        "Name": "Utapau",
        "Rotation period": "27",
        "Orbital period": "351",
        "Diameter": "12900",
        "Climate": "temperate, arid, windy",
        "Gravity": "1 standard",
        "Terrain": "scrublands, savanna, canyons, sinkholes",
        "Surface water": "0.9",
        "Population": "95000000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/6/"
        ],
        "Created": "2014-12-10T12:49:01.491000Z",
        "Edited": "2014-12-20T20:58:18.439000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/12/"
    },
    {
        "Name": "Vulpter",
        "Rotation period": "22",
        "Orbital period": "391",
        "Diameter": "14900",
        "Climate": "temperate, artic",
        "Gravity": "1",
        "Terrain": "urban, barren",
        "Surface water": "unknown",
        "Population": "421000000",
        "Films": [],
        "Created": "2014-12-20T09:56:58.874000Z",
        "Edited": "2014-12-20T20:58:18.485000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/39/"
    },
    {
        "Name": "Yavin IV",
        "Rotation period": "24",
        "Orbital period": "4818",
        "Diameter": "10200",
        "Climate": "temperate, tropical",
        "Gravity": "1 standard",
        "Terrain": "jungle, rainforests",
        "Surface water": "8",
        "Population": "1000",
        "Films": [
            "https://swapi-trybe.herokuapp.com/api/films/1/"
        ],
        "Created": "2014-12-10T11:37:19.144000Z",
        "Edited": "2014-12-20T20:58:18.421000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/3/"
    },
    {
        "Name": "Zolan",
        "Rotation period": "unknown",
        "Orbital period": "unknown",
        "Diameter": "unknown",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "unknown",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-20T16:56:37.250000Z",
        "Edited": "2014-12-20T20:58:18.514000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/54/"
    },
    {
        "Name": "unknown",
        "Rotation period": "0",
        "Orbital period": "0",
        "Diameter": "0",
        "Climate": "unknown",
        "Gravity": "unknown",
        "Terrain": "unknown",
        "Surface water": "unknown",
        "Population": "unknown",
        "Films": [],
        "Created": "2014-12-15T12:25:59.569000Z",
        "Edited": "2014-12-20T20:58:18.466000Z",
        "URL": "https://swapi-trybe.herokuapp.com/api/planets/28/"
    }
  ]

  if (!isLoading) {
    const dataRender = planetsToRender.map((planet) => setTableCells(planet))
    console.log(dataRender)
    return (
      <div>
        {filterByNumericValue.length > 0 && filtersUsed}
        <Pagination data={ dataPlanets } headers={ HEADERS_TABLE } />
      </div>
    )
  }
  return <Loading />
}
