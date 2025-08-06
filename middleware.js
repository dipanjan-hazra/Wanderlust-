 const listing = require("./models/listing");
 const review = require("./models/review.js");
 const {listingSchema} = require("./schema.js");
 const ExpressError = require("./utils/ExpressError.js");
 const {reviewSechema} = require("./schema.js");

 module.exports.isLoggedin =(req,res,next)=>{
     if(!req.isAuthenticated()){
      //redirect url - 
      req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be login to create post");
      return  res.redirect("/login");
    }
    next();
 }


 module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
      res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
 }

 //authrization  for  edit/delete operation
 module.exports.isOwner = async(req,res,next)=>{
    let{ id } =req.params;
    let listingAuth =await listing.findById(id);
    if(!listingAuth.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","You don't have permission to do this operation");
      return res.redirect(`/listings/${id}`);
    }
    next();
 }
 
// listing validation
 module.exports.validateListing = (req,res,next)=>{
      let {error} = listingSchema.validate(req.body);
    if(error){
     let errMsg = error.details.map((el)=>el.message).join(" , ");
     throw new ExpressError(400, errMsg );
    }else{
     next();
    }
 }

 module.exports.validateReview = (req,res,next)=>{
     let {error} = reviewSechema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(" , ");
    throw new ExpressError(400, errMsg );
   }else{
    next();
   }
}

module.exports.isReviewAuthor= async(req,res,next)=>{
    let{ id,reviewId } =req.params;
    let reviewAuth =await review.findById(reviewId);
    if(!reviewAuth.author._id.equals(res.locals.currUser._id)){
      req.flash("error","You don't have permission to do this operation");
      return res.redirect(`/listings/${id}`);
    }
    next();
 }