const createActivity = require("./../controllers/createActivity")

const createActivityHandler= async (req, res) => {
  try {
    const { name, difficulty, duration, season, CountryID } = req.body;

    if (!name || !difficulty ||  !duration ||  !season ||  !CountryID) {
      return res.status(404).json({error:"Required data are missing"});
    }
   
    const selectedCountries = await createActivity( {name, difficulty, duration, season, CountryID} )

    return res.status(200).json(selectedCountries);
  } catch (error) {
    return res.status(500).json({error:error.message});
  }
};


module.exports = createActivityHandler;
