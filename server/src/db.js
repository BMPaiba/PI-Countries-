require("dotenv").config();
const { Sequelize } = require("sequelize");

const CountryModel = require("../src/models/Country");
const ActivityModel = require("../src/models/Activity");

const fs = require("fs");
const path = require("path");
const { DB_RENDER_URL } =
  process.env;

const sequelize = new Sequelize(DB_RENDER_URL, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});


const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

CountryModel(sequelize);
ActivityModel(sequelize);

const { Country, Activity } = sequelize.models;

const tablaIntermedia = "CountriesActivities";
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Country.belongsToMany(Activity, { through: tablaIntermedia });
Activity.belongsToMany(Country, { through: tablaIntermedia });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
