const getCountries = require("../controllers/getCountries");

const getCountriesHandler = async (req, res) => {
  try {
    const allCountries = await getCountries();

    return res.status(200).json(allCountries);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getCountriesHandler;
