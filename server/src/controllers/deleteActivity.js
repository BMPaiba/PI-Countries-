const { Activity, CountriesActivities, Country } = require("../db");

const deleteActivity = async (req,res) => {
    
    const {idDelete} = res.params
    try {
        const activities = await Activity.destroy({where: { id:  idDelete }})
        console.log(activities);
        return res.status(200).json(activities)
    } catch (error) {
        return res.status(404).send(error.message)
    }

};
module.exports = deleteActivity;
