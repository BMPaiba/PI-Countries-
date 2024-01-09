const getCountryById = require("../controllers/getCountryById");

const getCountryByIdHandler = async (req, res) => {
  try {
    const { idPais } = req.params;

    const activitiesForCountry = await getCountryById(idPais)

    if(activitiesForCountry.length>0) {
      return res.status(200).json(activitiesForCountry)
    }
    else return res.status(401).json({error: "Pais no encotrado"})
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getCountryByIdHandler;
