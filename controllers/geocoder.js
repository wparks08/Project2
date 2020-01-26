var NodeGeocoder = require("node-geocoder");

var options = {
    provider: "mapquest",
    apiKey: "fRzrd0LXmbJgAyJmCAg3R2IuepOAMKuX"
}

var geocoder = NodeGeocoder(options);

module.exports = function ({address1, city, state, zip}) {
    return new Promise((resolve, reject) => {
        geocoder.geocode({
            address: address1,
            city: city,
            state: state,
            zip: zip
        }).then(res => {
            resolve({
                latitude: res[0].latitude,
                longitude: res[0].longitude
            });
        }).catch(err => {
            reject(err);
        })    
    });
    
}