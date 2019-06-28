const db = require("../models");

module.exports = {
  getParks: function (req, res) {
    db.Park
      .findAll()
      .then(dbPark => res.json(dbPark))
      .catch(err => res.status(422).json(err));
  },
  getAllParks: function (req, res) {
    // Company.findAll({
    //   include: [ { model: Division, include: [ Department ] } ],
    //   order: [ [ Division, Department, 'name' ] ]
    // });
    db.Park
      .findAll({
        include: [{
          model: db.Trail
          ,
          include: [{
            model: db.Track
          ,
            include: [{
              model: db.Cord
            }],
          // }],   Trails.fk_park_id`trail_id
            //order: [[{model: db.Cord}, "fk_track_id", "cord_id" ]] 
            // order: [[{ model: db.Cord}, ["fk_track_id"], ["cord_id"]]]
        }],
          //order: [[{ model: db.Track}, "fk_trail_id", "track_id"]]
          // order: [[{ model: db.Track}, ["fk_trail_id"], ["track_id"]]]
        }],
        //order: [[{ model: db.Trail}, "fk_park_id", "trail_id"]]
        // order: [[{ model: db.Trail}, ["fk_park_id"], ["trail_id"]]]
        // order: [[ Trail, "fk_park_id", "trail_id"], [Track, "fk_trail_id", "track_id"], [Cord, "fk_track_id", "cord_id"]]
      })
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
          where: {trail_id: req.params.parkId}
          ,
          include: [{
            model: db.Track,
            where: {track_id: db.Trail.trail_id}
          ,
            include: [{
              model: db.Cord,
              where: {cord_id: db.Track.cord_id}
            }],
      //       order: [[{model: db.Cord}, "track_id", "cord_id" ]] 
          }],
      //     order: [[{ model: db.Track}, "trail_id", "track_id"]]
        }],
      //   order: [[{ model: db.Trail}, "park_id", "trail_id"]]
      })
      .then(dbPark => res.json(dbPark))
      .catch(err => res.status(422).json(err));
  },
  getOneTrail: function (req, res) {
    db.Trail
      .findOne({
        where: {
          "$trail_id$": req.params.trailId
        },
        include: [{
          model: db.Track,
          where: {trail_id: req.params.trailId}
        ,
          include: [{
            model: db.Cord,
            where: {track_id: db.Track.track_id}
          }],
          // order: [[{model: db.Cord}, "track_id", "cord_id" ]] 
        }],
        // order: [[{ model: db.Track}, "trail_id", "track_id"]]
      })
      .then(dbTrail => res.json(dbTrail))
      .catch(err => res.status(422).json(err));
  }
};
