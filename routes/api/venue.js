var router = require("express").Router();
var db = require("../../models");
var geocoder = require("../../controllers/geocoder");

router.get("/all", (req, res) => {
    console.log(req.url);
    db.venue.findAll({}).then(venues => {
        res.json(venues);
    });
});

router.get("/search", (req, res) => {
    db.venue.findAll({
        where: {
            name: {
                [Op.like]: "%" + req.body.name + "%"
            }
        }
    }).then(venues => {
        if (venues) {
            res.json(venues);
        } else {
            res.json({ message: "No venues found" });
        }
    })
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
    geocoder(req.body).then(coords => {
        newVenue = req.body;
        newVenue.latitude = coords.latitude;
        newVenue.longitude = coords.longitude;

        db.venue
            .create(newVenue)
            .then(venue => {
                res.json(venue);
            })
            .catch(err => {
                res.status(500).send("Server error: Invalid venue");
            });
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

router.delete("/:id", (req, res) => {
    db.venue.destroy({
        where: {
            id: req.params.id
        }
    }).then(affectedRows => {
        res.json(affectedRows);
    })
});

router.post("/:id/addEvent", (req, res) => {
    db.venue.findOne({
        where: {
            id: req.params.id
        }
    }).then(venue => {
        if (venue) {
            db.event.create({
                name: req.body.name,
                dateTimeStart: req.body.dateTimeStart,
                dateTimeEnd: req.body.dateTimeEnd
            }).then(event => {
                venue.addEvent(event);
                res.status(200).send("Event added to venue");
            })
        } else {
            res.status(404).send("Venue not found.");
        }

    })
});

router.post("/:venueId/attachEvent/:eventId", (req, res) => {
    db.venue.findOne({
        where: {
            id: req.params.venueId
        }
    }).then(venue => {
        if (venue) {
            db.event.findOne({
                where: {
                    id: req.params.eventId
                }
            }).then(event => {
                if (event) {
                    venue.addEvent(event);
                    res.status(200).send("Event attached");
                } else {
                    res.status(404).send("Event not found.");
                }
            })
        } else {
            res.status(404).send("Venue not found.");
        }
    })
})

module.exports = router;
