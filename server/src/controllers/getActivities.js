const { Activity, CountriesActivities, Country } = require("../db");

const getActivities = async () => {
  const Countries = await Country.findAll();
  const allActivities = await Activity.findAll();
  const CountriesActivitiesInter = await CountriesActivities.findAll();

  const addPropertyCountries = allActivities.map((activity) => {
    const addedProperty = { ...activity.toJSON(), countries: [] };
    return addedProperty;
  });

  let activityWithCountries = addPropertyCountries.map((act) => {
    let arrayActivities = CountriesActivitiesInter.filter(
      (inter) => inter.ActivityId === act.id
    );

    let relatedCountries = arrayActivities.map((inter) => {
      return Countries.find((country) => country.id === inter.CountryId);
    });

    act.countries = relatedCountries.map((country) => country.id);

    return act;
  });
  return activityWithCountries;
};
module.exports = getActivities;
