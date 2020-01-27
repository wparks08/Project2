var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var db = require("../models");

module.exports = {
    //Provides configuration on how to handle incorrect usernames, incorrect passwords, as
    //well as handling successful logins.
    config: function(passport) {
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
    },
    //This is the middleware used to secure Routes. When used on a Route, if there is not
    //an authenticated user for the session of the requesting user, they will be redirected
    //to a login page.
    //Usage:
    //    var auth = require("../config/authentication");
    //
    //    app.get("my/route/to/secure", auth.secureRoute, function(req, res) {});
    //
    secureRoute: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/user/login");
        }
    },

    isAuthenticated: function (req, res, next) {
        res.locals.isAuthenticated = req.isAuthenticated();
        return next();
    }
} 