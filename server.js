const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
var db = require("./models");
require('dotenv').config();
const application = require("./routes/application");
var aws = require('aws-sdk');

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static("client/build"));
app.use(express.static("public"));

// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// app.post('/auth',
//   passport.authenticate('local'),
//   function (req, res) {
//     if (req.isAuthenticated()) {
//       res.sendStatus(200);
//     }
//   }
// );

// app.get('/logout', application.destroySession);

app.use(routes);  
require("./routes/api/trail.js")(app);
require("./routes/api/park.js")(app);
require("./routes/api/image.js")(app);
// require("./routes/api-routes.js")(app);

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(`?  ==> API Server now listening on PORT ${PORT}!`);
  });
});