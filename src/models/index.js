let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')

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
db.WpTerm.hasOne( db.WpTermTaxonomy, {foreignKey: 'term_id'} )
//db.WpTermTaxonomy.belongsTo( db.WpTerm, {foreignKey: 'term_id'} )
// post N:M term_taxonomy
//db.WpPost.hasMany(db.WpTermRelationships, { foreignKey: 'object_id' })
db.WpPost.belongsToMany(db.WpTermTaxonomy, { through: db.WpTermRelationships, foreignKey: 'object_id', otherKey: 'term_taxonomy_id', as: 'WpTermTaxonomies' })

db.WpTermTaxonomy.belongsToMany(db.WpPost, { through: db.WpTermRelationships, otherKey: 'object_id', foreignKey: 'term_taxonomy_id', as: 'WpPosts' })


//==============================================================================
// add pagination
//==============================================================================
//https://www.npmjs.com/package/sequelize-paginate
sequelizePaginate.paginate( db.WpPost )

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
