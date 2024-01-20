const { Router } = require("express");
const getActivitiesHandler = require("../handlers/getActivitiesHandler.js");
const getCountryByNameHandler = require("../handlers/getCountryByNameHandler.js");
const getCountryByIdHandler = require("../handlers/getCountryByIdHandler.js");
const getCountriesHandler = require("../handlers/getCountriesHandler.js");
const createActivityHandler = require("../handlers/createActivityHandler.js");
const deleteActivity = require("../controllers/deleteActivity.js");

const router = Router();

router.get("/countries",getCountriesHandler)
router.get("/countries/name", getCountryByNameHandler)
router.get("/countries/:idPais", getCountryByIdHandler)
router.post("/activities",createActivityHandler)
router.get("/activities",getActivitiesHandler)
// router.delete("/activities/:idDelete",deleteActivity )

module.exports = router;