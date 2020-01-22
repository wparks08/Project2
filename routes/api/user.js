var router = require("express").Router();
var db = require("../../models");

router.post("/saveEvent/:eventId", (req, res) => {
    if (req.user) {
        db.user.findOne({
            where: {
                id: req.user.id
            }
        }).then(user => {
            db.event.findOne({
                where: {
                    id: req.params.eventId
                }
            }).then(event => {
                if (event) {
                    user.addSaved(event);
                    res.status(200).send("Event saved.");
                } else {
                    res.status(404).send("Event not found.")
                }
            })
        })
    } else {
        res.status(401).send("Please login.");
    }
});

router.get("/savedEvents", (req, res) => {
    if (req.user) {
        db.user.findOne({
            where: {
                id: req.user.id
            },
            include: {
                model: db.event,
                as: "saved"
            }
        }).then(user => {
            console.log(user);
            res.json(user.saved);
        })
    }
})

module.exports = router;