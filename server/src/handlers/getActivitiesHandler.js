const getActivities = require("../controllers/getActivities");

const getActivitiesHandler = async (req, res) => {
  try {
    const activityWithCountries = await getActivities();
    return res.status(200).json(activityWithCountries);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = getActivitiesHandler;
