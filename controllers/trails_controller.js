const db = require("../models");

module.exports = {
  getOneTrail: function (req, res) {
    db.Trail
      .findOne({
        where: {
          "$trail_id$": req.params.trailId
        },
        include: [{
          model: db.Track
        ,
          include: [{
            model: db.Cord
          }]
        }]
      })
      .then(dbTrail => res.json(dbTrail))
      .catch(err => res.status(422).json(err))
  },
  getTrailOnly: function (req, res) {
    db.Trail
      .findOne({
        where: {
          "$trail_id$": req.params.trailId
        }
      })
      .then(dbTrail => res.json(dbTrail))
      .catch(err => res.status(422).json(err))
  }
};
