'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.Park.hasMany(db.Trail, { foreignKey: 'fk_park_id', sourceKey: 'park_id', onDelete: 'cascade'});
// db.Trail.belongsTo(db.Park, { foreignKey: 'fk_park_id', targetKey: 'park_id', onDelete: 'cascade'});
// db.Trail.hasMany(db.Track, { foreignKey: 'fk_trail_id', sourceKey: 'trail_id', onDelete: 'cascade'});
// db.Track.belongsTo(db.Trail, { foreignKey: 'fk_trail_id', targetKey: 'trail_id', onDelete: 'cascade'})
// db.Track.hasMany(db.Image, { foreignKey: 'fk_track_id', constraints: false, sourceKey: 'track_id', onDelete: 'cascade'});
// db.Image.belongsTo(db.Track, { foreignKey: 'fk_track_id', constraints: false, targetKey: 'track_id', onDelete: 'cascade'});
// db.Track.hasMany(db.Cord, { foreignKey: 'fk_track_id', constraints: false, sourceKey: 'track_id', onDelete: 'cascade'});
// db.Cord.belongsTo(db.Track, { foreignKey: 'fk_track_id', constraints: false, targetKey: 'track_id', onDelete: 'cascade'});

db.Park.hasMany(db.Trail, { foreignKey: 'fk_park_id', sourceKey: 'park_id', onDelete: 'cascade', foreignKeyConstraint: true});
db.Trail.belongsTo(db.Park, { foreignKey: 'fk_park_id', targetKey: 'park_id', onDelete: 'cascade', foreignKeyConstraint: true});
db.Trail.hasMany(db.Track, { foreignKey: 'fk_trail_id', sourceKey: 'trail_id', onDelete: 'cascade', foreignKeyConstraint: true});
db.Track.belongsTo(db.Trail, { foreignKey: 'fk_trail_id', targetKey: 'trail_id', onDelete: 'cascade', foreignKeyConstraint: true})
db.Track.hasMany(db.Image, { foreignKey: 'fk_track_id', sourceKey: 'track_id', onDelete: 'cascade', foreignKeyConstraint: true});
db.Image.belongsTo(db.Track, { foreignKey: 'fk_track_id', targetKey: 'track_id', onDelete: 'cascade', foreignKeyConstraint: true});
db.Track.hasMany(db.Cord, { foreignKey: 'fk_track_id', sourceKey: 'track_id', onDelete: 'cascade', foreignKeyConstraint: true});
db.Cord.belongsTo(db.Track, { foreignKey: 'fk_track_id', targetKey: 'track_id', onDelete: 'cascade', foreignKeyConstraint: true});


// db.Park.hasMany(db.Trail, { foreignKey: 'fk_park_id', sourceKey: 'park_id', onDelete: 'cascade'});
// db.Trail.belongsTo(db.Park, { foreignKey: 'fk_park_id', targetKey: 'park_id', onDelete: 'cascade'});
// db.Trail.hasMany(db.Track, { foreignKey: 'fk_trail_id', sourceKey: 'trail_id', onDelete: 'cascade'});
// db.Track.belongsTo(db.Park, { through: {model: db.Trail},  foreignKey: 'fk_trail_id', targetKey: 'fk_trail_id', onDelete: 'cascade'})
// db.Track.hasMany(db.Cord, { foreignKey: 'fk_track_id', sourceKey: 'track_id', onDelete: 'cascade'});
// db.Cord.belongsTo(db.Park, { through: {model: db.Track, Trail}, foreignKey: 'fk_track_id', targetKey: 'track_id', onDelete: 'cascade'});

module.exports = db;
