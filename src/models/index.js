let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')
const { buildSharedAssociations } = require( './common/associations' )

let basename = path.basename(__filename);
let config = require('../config/db.js');


let db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

fs
  .readdirSync(__dirname+ '/shared')
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    let model = sequelize.import(path.join(__dirname, 'shared', file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//==============================================================================
// build association
//==============================================================================
buildSharedAssociations( db )

//==============================================================================
// add pagination
//==============================================================================
//https://www.npmjs.com/package/sequelize-paginate
sequelizePaginate.paginate( db.WpPost )

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
