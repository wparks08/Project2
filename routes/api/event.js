var router = require("express").Router();
var db = require("../../models");

router.get("/all", (req, res) => {
    db.event.findAll({}).then(events => {
        res.json(events);
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