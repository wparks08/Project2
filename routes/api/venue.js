var router = require("express").Router();
var db = require("../../models");

router.get("/all", (req, res) => {
    db.venue.findAll({}).then(venues => {
        res.json(venues);
    });
});

router.get("/:id", (req, res) => {
    db.venue.findOne({
        where: {
            id: req.params.id
        }
    }).then(venue => {
        res.json(venue);
    });
});

router.post("/create", (req, res) => {
    // let newVenue = {
    //     name: req.body.name,
    //     address1: req.body.address1,
    //     address2: req.body.address2,
    //     city: req.body.city,
    //     state: req.body.state,
    //     zip: req.body.zip
    // }

    db.venue.create(req.body).then(venue => {
        res.json(venue);
    });
});

router.put("/:id", (req, res) => {

})

module.exports = router;