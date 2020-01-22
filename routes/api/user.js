var router = require("express").Router();
var db = require("../../models");

router.post("/saveEvent/:eventId", (req, res) => {
    //TODO add event to logged in user via association
});

module.exports = router;