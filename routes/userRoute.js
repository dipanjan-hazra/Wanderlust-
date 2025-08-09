const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const UserControler =require("../controlers/user.js") ;

// signup - page &  validation
router.route("/signup")
.get(UserControler.getSignUp)
.post(WrapAsync(UserControler.postSignUp));

router

// login  page &  authantication 

router.route("/login")
.get(UserControler.getLogin)
.post(

    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    UserControler.postLogin
);

// Log out 
router.get("/logout",UserControler.Logout)

module.exports =router;
