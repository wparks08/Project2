require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var authentication = require("./controllers/authentication");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "!?!WhatsApp!?!" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(authentication.isAuthenticated);

//Passport
authentication.config(passport);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: __dirname + '/views/partials/'
  })
);
app.set("view engine", "handlebars");

// Routes
//Add Map routes
require("./routes/mapRoutes")(app);
require("./routes/api")(app);
require("./routes/userRoutes")(app); //Authentication routes
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
