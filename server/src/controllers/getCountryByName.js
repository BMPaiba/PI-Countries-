const { Country } = require("../db");
const { Op } = require("sequelize");

const getCountryByName = async (name) => {
  const countrySearched = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `${name}%`,
      },
    },
  });
  if (countrySearched.length > 0) {
    return countrySearched;
  } else {
    throw Error("Country not found");
  }
};

module.exports = getCountryByName;
