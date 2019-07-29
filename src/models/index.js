let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
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

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//==============================================================================
// build association
//==============================================================================
db.WpTerm.hasOne( db.WpTermTaxonomy)
db.WpTermTaxonomy.belongsTo( db.WpTerm)
// post N:M term_taxonomy
//db.WpPost.hasMany(db.WpTermRelationships, { foreignKey: 'object_id' })
db.WpPost.belongsToMany(db.WpTermTaxonomy, { through: WpTermRelationships, foreignKey: 'object_id' })
db.WpTermTaxonomy.belongsToMany(db.WpPost, { through: WpTermRelationships, otherKey: 'object_id' })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
