const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const  path =require("path");
const methodOverride= require("method-override");
const ejsMate = require("ejs-mate");
const WrapAsync = require("./utils/WrapAsync.js"); //review -donelis -done
const ExpressError = require("./utils/ExpressError.js");
// const { error } = require("console");
const {listingSchema} = require("./schema.js");// dels
const Review = require("./models/review.js");
const {reviewSechema} = require("./schema.js");


mongoUrl ="mongodb://127.0.0.1:27017/wanderlust";


main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(mongoUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// basic  route 
app.get("/",(req,res)=>{
    res.send("Working");
});








//listing  requirement 
const  listingrouts= require("./routes/listingrouts.js");
// listing route
app.use("/listings",listingrouts);


//Reviews  Requirement 
const reviewroute = require("./routes/reviewroutes.js");
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


