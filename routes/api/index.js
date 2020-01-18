module.exports = function(app) {
    app.use("/api/venue", require("./venue"));
    app.use("/api/event", require("./event"));
};
