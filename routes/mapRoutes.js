var IPGeolocationAPI = require("ip-geolocation-api-javascript-sdk");
var auth = require("../controllers/authentication");

module.exports = function (app) {
    app.get("/map", auth.secureRoute, function (req, res) {
        var ipgeolocationApi = new IPGeolocationAPI(
            process.env.GEOLOCATER_KEY,
            false
        );
        function handleResponse(json) {
            console.log(json);
            console.log(json.latitude, json.longitude);

            res.render("map", {
                longitude: json.longitude,
                latitude: json.latitude
            });
        }

        ipgeolocationApi.getGeolocation(handleResponse);
    });
};
