var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var db = require("../models");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(function(username, password, done) {
            db.user.findOne({ where: { username: username } }).then(user => {
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: "Incorrect password" });
                }

                return done(null, user);
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        db.user
            .findOne({
                where: {
                    id: id
                }
            })
            .then(user => {
                done(null, user);
            });
    });
}