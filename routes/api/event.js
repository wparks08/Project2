var router = require("express").Router();
var db = require("../../models");
var Op = require("sequelize").Op;

router.get("/all", (req, res) => {
    db.event.findAll({}).then(events => {
        res.json(events);
    })
});

router.get("/search", (req, res) => {
    db.event.findAll({
        where: {
            name: {
                [Op.like]: "%" + req.body.name + "%"
            }
        }
    }).then(events => {
        if (events) {
            res.json(events);
        } else {
            res.json({ message: "No events found" });
        }
    })
});

router.get("/:id", (req, res) => {
    db.event.findOne({
        where: {
            id: req.params.id
        }
    }).then(event => {
        res.json(event);
    })
});

router.get("/:id/venue", (req, res) => {
    db.event.findOne({
        where: {
            id: req.params.id
        },
        include: db.venue
    }).then(event => {
        res.json(event);
    });
});

router.get("/:id/attendingUsers", (req, res) => {
    db.event.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: db.user,
            as: "attendees"
        }
    }).then(event => {
        res.json(event.attendees);
    })
});

router.get("/:id/interestedUsers", (req, res) => {
    db.event.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: db.user,
            as: "interestedUsers"
        }
    }).then(event => {
        res.json(event.interestedUsers);
    })
})

router.post("/create", (req, res) => {
    db.event.create(req.body).then(event => {
        res.json(event);
    })
});

router.put("/:id", (req, res) => {
    db.event.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
        }
    ).then(event => {
        res.json(event);
    })
});

router.delete("/:id", (req, res) => {
    db.event.destroy({
        where: {
            id: req.params.id
        }
    }).then(affectedRows => {
        res.json(affectedRows);
    })
})

module.exports = router