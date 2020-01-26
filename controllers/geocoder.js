var NodeGeocoder = require("node-geocoder");

var options = {
    provider: "mapquest",
    apiKey: "fRzrd0LXmbJgAyJmCAg3R2IuepOAMKuX"
}

var geocoder = NodeGeocoder(options);

geocoder.geocode("1417 R Street Sacramento CA").then(function (res) {
    console.log(res);
})

module.exports = function (address) {
    return new Promise((resolve, reject) => {
        geocoder.geocode(address).then(res => {
            //return the first result
            resolve(res[0]);
        }).catch(err => {
            reject(err);
        })    
    });
    
}