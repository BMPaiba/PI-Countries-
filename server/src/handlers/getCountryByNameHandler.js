const getCountryByName = require("../controllers/getCountryByName");

const getCountryByNameHandler = async(req,res)=> {
    try {
        const {name} = req.query
        const countrySearched = await getCountryByName(name)
        if(countrySearched.length> 0) {
            return res.status(200).json(countrySearched)
          }
          else return res.status(404).json({error: "Country not found"})
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };

module.exports = getCountryByNameHandler

