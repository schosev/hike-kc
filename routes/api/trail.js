// const router = require("express").Router();
const trailsController = require("../../controllers/trails_controller");

// Matches with "/api/pets"
//===================================================================================== //
// router
//   .route("/")
//   .get(trailsController.getAllTrails)


// module.exports = router;

module.exports = function (app) {

  // GET route for getting all of the todos
  app.get("/api/trail/:trailId", function (req, res) {
    console.log("inside get api/trails")
    trailsController.getOneTrail(req, res)
  });

  app.get("/api/trailOnly/:trailId", function (req, res) {
    console.log("inside get api/trailOnly")
    trailsController.getTrailOnly(req, res)
  });

}
