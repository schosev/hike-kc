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
  app.get("/api/trails", function (req, res) {
    console.log("inside get api/trails")
    trailsController.getAllParks(req, res)
    // .then(function (dbPark) {
    //   // We have access to the todos as an argument inside of the callback function
    //   console.log("inside .then function")
    //   res.json(dbPark);
    // })
    // .catch(function (err) {
    //   res.status(422).json(err)
    // })
  });

}
