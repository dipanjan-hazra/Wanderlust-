const express = require("express");
const route = express.Router({mergeParams:true}); //require  for  sending  param (id) from app.js to review.js  file  
const WrapAsync = require("../utils/WrapAsync.js"); 

const { validateReview, isLoggedin, isReviewAuthor } = require("../middleware.js");

const ReviewControler = require("../controlers/review.js");

// route  for  reviews -- 
// Post Route 
    route.post("/",isLoggedin,validateReview, WrapAsync (ReviewControler.createReview));

    // Delete review Route 
    route.delete("/:reviewId" ,isLoggedin,isReviewAuthor,WrapAsync (ReviewControler.DelReview));


    module.exports=route;