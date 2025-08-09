if(process.env.NODE_ENV !="production"){
require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const  path =require("path");
const methodOverride= require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");


// session and  connect-flash 👇
const session = require("express-session");
const MongoStore = require('connect-mongo'); //connect-mongo
const flash  = require("connect-flash");


//Authantication  and  Authrization 
const  passport = require("passport");
const LocalStrategy = require("passport-local")
const User = require("./models/user.js");


//Reviews  Requirement 
const reviewroute = require("./routes/reviewroutes.js");
//listing  requirement 
const  listingrout= require("./routes/listingrouts.js");
//user requirement - 
const userRoute = require("./routes/userRoute.js");


const dbUrl = process.env.ATLAS_DB_URL;

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


const store =  MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("error on mongo url store");
})

const sessionOptions ={
    store,
    secret : process.env.SECRET,
    resave : false ,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000, // one week  time
        maxAge:  7*24*60*60*1000,
        httponly:true, // for prevent cross scripting  attack  
    }
};



app.use(flash());
// Correct Middleware Order
app.use(session(sessionOptions)); // 1. Session must be first
app.use(flash());                // 2. Flash depends on session

app.use(passport.initialize());  // 3. Initialize Passport
app.use(passport.session());     // 4. Use Passport's session handling
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success =req.flash("success");
    res.locals.error =req.flash("error")
   res.locals.currUser = req.user;
    next();
});

//signup / user route - 
app.use("/",userRoute)



// listing route
app.use("/listings",listingrout);



//reviews route
app.use("/listings/:id/reviews",reviewroute);


app.all("*s", (req, res, next) => {
    let err = new ExpressError(500,"Page Not found");
    next(err);
});

app.use((err,req,res,next)=>{
    let {statusCode =500 , message =" Somthing went wrong"} = err; 
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{err});
});



app.listen(8080,()=>{
    console.log("server is  Listening to port 8080");
});


