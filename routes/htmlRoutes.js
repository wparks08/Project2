var db = require("../models");
var path = require("path");
var IPGeolocationAPI = require("ip-geolocation-api-javascript-sdk");
var GeolocationParams = require("ip-geolocation-api-javascript-sdk/GeolocationParams.js");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    console.log(req.body)
    // if (req.user != null) {
    //   var authenticated = true;
    // }
    // else {
    //   var authenticated = false;
    // }
    // console.log(authenticated)
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
