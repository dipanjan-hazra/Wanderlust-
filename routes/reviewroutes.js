const express = require("express");
const route = express.Router({mergeParams:true}); //require  for  sending  param (id) from app.js to review.js  file  
const WrapAsync = require("../utils/WrapAsync.js"); 
const listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedin, isReviewAuthor } = require("../middleware.js");
// validation for  review 


// route  for  reviews -- 
// Post Route 
    route.post("/",isLoggedin,validateReview, WrapAsync (async(req,res,next)=>{
       let Listing = await listing.findById(req.params.id)
       let newReview = new Review(req.body.review);
       newReview.author = req.user._id;
       Listing.reviews.push(newReview);
      await newReview.save();
      await Listing.save();
       req.flash("success","New review added😁");
      res.redirect(`/listings/${Listing._id}`);
    }));

    // Delete review Route 
    route.delete("/:reviewId" ,isLoggedin,isReviewAuthor,WrapAsync (async(req,res,next)=>{
        let {id ,reviewId} = req.params;

        await listing.findByIdAndUpdate(id ,{$pull:{reviews : reviewId}});

        await Review.findByIdAndDelete(reviewId); 
         req.flash("success","Review Deleted 😒");
        res.redirect(`/listings/${id}`);
    }));


    module.exports=route;