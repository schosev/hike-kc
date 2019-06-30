const db = require("../models");

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
              model: db.Cord,
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
  }
};
