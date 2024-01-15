const { Activity, Country } = require("../db");

const createActivity = async ({name,difficulty,duration,season, CountryID,}) => {

  const existingActivity = await Activity.findOne({
    where: { name }
  });

  if (existingActivity) {
    throw new Error("Activity with this name already exists");
  }

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

