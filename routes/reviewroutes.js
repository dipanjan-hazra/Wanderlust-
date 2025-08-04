const express = require("express");
const route = express.Router({mergeParams:true}); //require  for  sending  param (id) from app.js to review.js  file  
const WrapAsync = require("../utils/WrapAsync.js"); 
const {reviewSechema} = require("../schema.js");
const listing = require("../models/listing.js");
const Review = require("../models/review.js");



// validation for  review 
const  validateReview = (req,res,next)=>{
     let {error} = reviewSechema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(" , ");
    throw new ExpressError(400, errMsg );
   }else{
    next();
   }
}


// route  for  reviews -- 
// Post Route 
    route.post("/",validateReview, WrapAsync (async(req,res,next)=>{
       let Listing = await listing.findById(req.params.id)
       let newReview = new Review(req.body.review);
       Listing.reviews.push(newReview);

  
      await newReview.save();
      await Listing.save();
      res.redirect(`/listings/${Listing._id}`);
    }));

    // Delete review Route 
    route.delete("/:reviewId" ,WrapAsync (async(req,res,next)=>{
        let {id ,reviewId} = req.params;

        await listing.findByIdAndUpdate(id ,{$pull:{reviews : reviewId}});

        await Review.findByIdAndDelete(reviewId); 
        res.redirect(`/listings/${id}`);
    }));


    module.exports=route;