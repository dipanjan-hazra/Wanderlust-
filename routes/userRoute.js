const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")

// signup - page &  validation
router.get("/signup",(req,res)=>{
    res.render("user/signupForm.ejs");
});

router.post("/signup",WrapAsync(async(req,res)=>{
  try{
  let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registerUser = await User.register(newUser,password);
    console.log(registerUser);
     req.login(registerUser,(err)=>{
        if(err){
            return next();
        }
         req.flash("success","Welcome  to  Wanderlust");
        res.redirect("/listings");
     }); // automatic login  after signup
   
  }catch(err){
    req.flash("error",err.message);
    res.redirect("/signup");
  }
}));


// login  page &  authantication 

router.get("/login",(req,res)=>{
    res.render("user/login.ejs");
})

// this 👇 passport.authenticate  is  middleware form  passport  used  to  authatication part  of  our user 

// userRoute.js

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async (req, res) => {
        console.log(res.locals.redirectUrl);
        // This code was added
        req.flash("success", "Welcome back to Wanderlust!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);


// Log out 
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);

        }
        req.flash("success","We sad you are logout now")
        res.redirect("/listings");
    })
})

module.exports =router;
