const db = require("../models");
const sequelize = require('sequelize');

module.exports = {
  getParks: function (req, res) {
    db.Park
      .findAll()
      .then(dbPark => res.json(dbPark))
      .catch(err => res.status(422).json(err));
  },
  getOnePark: function (req, res) {
    db.Park
      .findOne({
        where: {
          "$park_id$": req.params.parkId
        },
        include: [{
          model: db.Trail,
          // where: {fk_park_id: db.Park.park_id}
          // ,
          include: [{
            model: db.Track,
          //   where: {track_id: db.Trail.trail_id}
          // ,
            include: [{
              all: true,
              //model: db.Cord,
              //model: db.Image,
              // where: {cord_id: db.Track.cord_id}
            }],
      //       order: [[{model: db.Cord}, "track_id", "cord_id" ]] 
          }],
          // order: [[{ model: db.Track}, "trail_id", "track_id"]]
        }],
        // order: [[{ model: db.Trail}, "park_id", "trail_id"]]
      })
      .then(dbPark => res.json(dbPark))
      .catch(err => res.status(422).json(err));
  },
  getAllParks: function (req, res) {
    db.Park
      .findAll({
        where: {
          // park_name :  {
            // $like: '%' + req.params.searchTxt + '%'
            park_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('park_name')), 'LIKE', '%' + req.params.searchTxt + '%')
          // }
        }
      })
      .then(dbPark => res.json(dbPark))
      .catch(err => res.status(422).json(err));
  },
  getParkName: function (req, res) {
    db.Park
      .findOne({
        where: {
          "$park_id$": req.params.parkId
        }
      })
      .then(dbPark => res.json(dbPark))
      .catch(err => res.status(422).json(err));
  },
};
