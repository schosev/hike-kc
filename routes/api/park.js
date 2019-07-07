// const router = require("express").Router();
const parksController = require("../../controllers/parks_controller");

// Matches with "/api/pets"
//===================================================================================== //
// router
//   .route("/")
//   .get(trailsController.getAllTrails)


// module.exports = router;

module.exports = function (app) {

  // GET route for getting all of the todos
  app.get("/api/parks", function (req, res) {
    console.log("inside get api/parks")
    parksController.getParks(req, res)
    // .then(function (dbPark) {
    //   // We have access to the todos as an argument inside of the callback function
    //   console.log("inside .then function")
    //   res.json(dbPark);
    // })
    // .catch(function (err) {
    //   res.status(422).json(err)
    // })
  });

  app.get("/api/onePark/:parkId", function (req, res) {
    console.log("inside get api/onePark")
    parksController.getOnePark(req, res)
  });

  app.get("/api/parkName/:parkId", function (req, res) {
    console.log("inside get api/parkName")
    parksController.getParkName(req, res)
  });

}
