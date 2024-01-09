const { Activity, Country } = require("../db");

const createActivity = async ({name,difficulty,duration,season, CountryID,}) => {

  const selectedCountries = await Country.findAll({
    where: {
      id: CountryID,
    },
  });

  if (!selectedCountries) {
    throw Error("The requested country does not exist");
  }

  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });

  await newActivity.addCountry(selectedCountries);
  
  return newActivity;
};

module.exports = createActivity;
