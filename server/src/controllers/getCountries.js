const { default: axios } = require("axios");
const { Country } = require("../db");
const URL = "http://localhost:5000/countries";

const getCountries = async () => {
  const allCountries = await Country.findAll();
  if (allCountries.length === 0) {
    const { data } = await axios.get(URL);
    let dataCountries = data.map((elem) => ({
      id: elem.cca3,
      name: elem.name.common,
      image: elem.flags.png,
      continent: elem.region,
      capital:
        Array.isArray(elem.capital) && elem.capital.length > 0
          ? elem.capital[0]
          : "Unknown",
      subregion: elem?.subregion,
      area: elem?.area,
      population: elem.population,
    }));
    const createAllCountries = await Country.bulkCreate(dataCountries);
    return createAllCountries;
  }
  if (allCountries.length > 0) {
    return allCountries;
  }
};

module.exports = getCountries;
