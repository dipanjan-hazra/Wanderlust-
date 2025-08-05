const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");

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
 req.flash("success","Welcome  to  Wanderlust");
 res.redirect("/listings");
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

// router.post("/login",passport.authenticate("local",{failureRedirect : "/login",failureFlash:true}),async(req,res)=>{

// })

// userRoute.js

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async (req, res) => {
        // This code was added
        req.flash("success", "Welcome back to Wanderlust!");
        res.redirect("/listings");
    }
);



module.exports =router;
