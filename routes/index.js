const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

console.log("inside routes/index.js");

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "./views/index.html"));
});

router.get("/trail/:trailId", function(req, res, next) {
  res.sendFile(path.join(__dirname, "..", "./views/trail.html"));
  
});

router.get("/park/:parkId", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "./views/park.html"));
});

router.get("/search/:searchValue", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "./views/search.html"));
});

// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, "..", "./views/index.html"));
// });

module.exports = router;
