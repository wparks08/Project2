const router = require("express").Router();
const db = require("../models");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

module.exports = function(app) {
    app.get("/user/login", (req, res) => {
        res.render("login", { message: req.flash("error") });
    });

    app.post(
        "/user/login",
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/user/login",
            failureFlash: true
        })
    );

    app.get("/user/register", (req, res) => {
        res.render("register", { message: req.flash("error") });
    });

    app.post("/user/create", (req, res) => {
        bcrypt.genSalt(10).then(salt => {
            bcrypt.hash(req.body.password, salt).then(hashedPassword => {
                db.user
                    .create({
                        username: req.body.username,
                        password: hashedPassword,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        zip: req.body.zip
                    })
                    .then(user => {
                        res.redirect("/user/login");
                    })
                    .catch(err => {
                        console.log(err.errors[0].message);
                        req.flash("error", err.errors[0].message);
                        res.redirect("/user/register");
                    });
            });
        });
    });
};
