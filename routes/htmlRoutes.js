var db = require("../models");
var path = require("path");
var IPGeolocationAPI = require("ip-geolocation-api-javascript-sdk");
var GeolocationParams = require("ip-geolocation-api-javascript-sdk/GeolocationParams.js");

module.exports = function (app) {
  //added .get call to return the frontend html, however there is an issue with the 
  //external js file as it calls the wrong html instead of a js file

  app.get("/example.html", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/example.html"));
    var ipgeolocationApi = new IPGeolocationAPI(
      "b10f4262d4fa4a8cb7f4dc5bda0533e7",
      false
    );
    function handleResponse(json) {
      console.log(json.longitude);
    }
    ipgeolocationApi.getGeolocation(handleResponse);
    var geolocationParams = new GeolocationParams();
  });
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
