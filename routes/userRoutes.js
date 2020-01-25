const db = require("../models");
const passport = require("passport");
const bcrypt = require("bcryptjs");

module.exports = function(app) {
    //Provides the login page
    app.get("/user/login", (req, res) => {
        res.render("login", {
            message: req.flash("error")
        });
    });

    //This route accepts the POST data from a form containing two inputs: username and password.
    //If the login is a success, user will be redirected to the route specified in successRedirect.
    //Authentication failures are directed back to the login page, with an error saying what went wrong.
    app.post(
        "/user/login",
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/user/login",
            failureFlash: true
        })
    );

    //Provides the registration page
    app.get("/user/register", (req, res) => {
        res.render("register", {
            message: req.flash("error")
        });
    });

    //accepts POST data from the registration page. Passwords are provided as raw, plain text, and encrypted
    //before they are persisted to the datastore. Passwords must also be at least 6 characters in length, enforced here.
    //If the new user creation is successful, the user will be redirected to the login page. If not,
    //they are directed back to the registration page with an error
    //saying what went wrong.
    app.post("/user/create", validatePasswordInput, (req, res) => {
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

    app.get("/user/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    })
};

function validatePasswordInput(req, res, next) {
    if (req.body.password.length < 5) {
        req.flash("error", "Password must be 6 or more characters.");
        res.redirect("/user/register");
        return;
    } else if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Passwords didn't match!");
        res.redirect("/user/register");
        return;
    } else {
        return next();
    }
}
