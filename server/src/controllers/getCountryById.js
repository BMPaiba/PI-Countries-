const {Country,Activity,CountriesActivities} = require("../db");
const { Op } = require('sequelize');

const getCountryById = async (idPais) => {
    
    const idPaisMayus = idPais.toUpperCase()

    const country = await Country.findAll({where:{id:idPaisMayus}})

    const allAct = await CountriesActivities.findAll({where:{CountryId: idPaisMayus}})

    const idActivities = allAct.map(elem => elem.ActivityId)

    const activitiesForCountry = await Activity.findAll({where:{id:{[Op.in]: idActivities}}})

    activitiesForCountry.unshift(country[0])

    if(country.length>0) {
      return activitiesForCountry
    }
    throw Error("Country not found");
};

module.exports = getCountryById;
