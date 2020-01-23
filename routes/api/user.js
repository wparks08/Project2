var router = require("express").Router();
var db = require("../../models");

router.post("/saveEvent/:eventId", (req, res) => {
    if (req.user) {
        findUser(req.user.id).then(user => {
            findEvent(req.params.eventId).then(event => {
                if (event) {
                    user.addSaved(event);
                    res.status(200).send("Event saved.");
                } else {
                    res.status(404).send("Event not found.");
                }
            });
        });
    } else {
        res.status(401).send("Please login.");
    }
});

router.get("/savedEvents", (req, res) => {
    if (req.user) {
        findUser(req.user.id, db.event, "saved").then(user => {
            console.log(user);
            res.json(user.saved);
        });
    } else {
        res.status(401).send("Please login.");
    }
});

router.post("/addToAttending/:eventId", (req, res) => {
    if (req.user) {
        findUser(req.user.id).then(user => {
            findEvent(req.params.id).then(event => {
                if (event) {
                    user.addAttending(event);
                    res.status(200).send("Added to attending events.");
                } else {
                    res.status(404).send("Event not found.");
                }
            });
        });
    } else {
        res.status(401).send("Please login.");
    }
});

router.get("/attendingEvents", (req, res) => {
    if (req.user) {
        findUser(req.user.id, db.event, "attending").then(user => {
            res.json(user.attending);
        });
    }
});

function findUser(id) {
    return db.user.findOne({
        where: {
            id: id
        }
    });
}

function findUser(id, model, alias) {
    return db.user.findOne({
        where: {
            id: id
        },
        include: {
            model: model,
            as: alias
        }
    });
}

function findEvent(id) {
    return db.event.findOne({
        where: {
            id: id
        }
    });
}

module.exports = router;
