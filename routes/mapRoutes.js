var path = require("path");
var IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
var GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "./example.html"));

        var ipgeolocationApi = new IPGeolocationAPI("b10f4262d4fa4a8cb7f4dc5bda0533e7", false);
        function handleResponse(json) {
            console.log(json);
        }
        ipgeolocationApi.getGeolocation(handleResponse);
        var geolocationParams = new GeolocationParams();
    });
    app.post("*", function (req, res) {

    })
};