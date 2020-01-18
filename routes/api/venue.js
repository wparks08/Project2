var router = require("express").Router();
var db = require("../../models");

router.get("/all", (req, res) => {
    console.log(req.url);
    db.venue.findAll({}).then(venues => {
        res.json(venues);
    });
});

router.get("/:id", (req, res) => {
    console.log(req.url);
    db.venue
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(venue => {
            res.json(venue);
        });
});

router.get("/:id/events", (req, res) => {
    db.venue
        .findOne({
            where: {
                id: req.params.id
            },
            include: db.event
        })
        .then(venue => {
            res.json(venue); //includes all events
        })
        .catch(err => {
            res.status(500).send(
                "Server error: Couldn't get events associated with venue:" +
                    req.params.id
            );
        });
});

router.post("/create", (req, res) => {
    db.venue
        .create(req.body)
        .then(venue => {
            res.json(venue);
        })
        .catch(err => {
            res.status(500).send("Server error: Invalid venue");
        });
});

router.put("/:id", (req, res) => {
    db.venue
        .update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(venue => {
            res.json(venue);
        })
        .catch(err => {
            res.status(500).send(
                "Server error: Could not update Venue:" + req.params.id
            );
        });
});

module.exports = router;
