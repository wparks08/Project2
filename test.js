var NodeGeocoder = require("node-geocoder");

var options = {
    provider: "mapquest",
    apiKey: "fRzrd0LXmbJgAyJmCAg3R2IuepOAMKuX"
}

var geocoder = NodeGeocoder(options);

geocoder.geocode("1417 R Street Sacramento CA").then(function (res) {
    console.log(res);
})