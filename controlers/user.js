const User = require("../models/user.js");


module.exports.getSignUp = (req,res)=>{
    res.render("user/signupForm.ejs");
};

module.exports.postSignUp = async(req,res)=>{
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
};

module.exports.getLogin = (req,res)=>{
    res.render("user/login.ejs");
};



// this 👇 passport.authenticate  is  middleware form  passport  used  to  authatication part  of  our user 
module.exports.postLogin = async (req, res) => {
        console.log(res.locals.redirectUrl);
        // This code was added
        req.flash("success", "Welcome back to Wanderlust!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }

// Logout
    module.exports.Logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);

        }
        req.flash("success","We sad you are logout now")
        res.redirect("/listings");
    })}