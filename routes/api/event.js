var router = require("express").Router();
var db = require("../../models");

router.get("/all", (req, res) => {
    db.event.findAll({}).then(events => {
        res.json(events);
    })
})

module.exports = router