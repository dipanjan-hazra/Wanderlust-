const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const listing = require("../models/listing.js");
const WrapAsync = require("../utils/WrapAsync.js");
const {listingSchema} = require("../schema.js");

// listing validation
const  validateListing = (req,res,next)=>{
     let {error} = listingSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(" , ");
    throw new ExpressError(400, errMsg );
   }else{
    next();
   }
}

router.get("/",WrapAsync(async(req,res,next)=>{
 
   const all =await listing.find({});
   res.render("listings/index.ejs",{all});
    
}));
// new ROute 💢
router.get("/new",(req,res)=>{
    res.render("listings/Newfrom.ejs")
});


// view -- show page , 
router.get("/:id",WrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing_data = await listing.findById(id).populate("reviews");
    if(!listing_data){
        req.flash("error","Listing You  want  to  access doesnot exist !")
       return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing_data});
 
}));

//create Route
router.post("/",validateListing, WrapAsync(async(req,res)=>{
    const list = new listing(req.body.listings);
    console.log(list);
    await list.save();
    req.flash("success","new  listings Added");
    res.redirect("/listings");
}));

//edit list
router.get("/:id/edit",WrapAsync(async (req,res)=>{
   let {id} = req.params;
    const listing_data = await listing.findById(id);
    if(!listing_data){
        req.flash("error","Listing You  want  to  edit doesnot exist !")
       return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing_data});
})) ;
//update route 
router.put("/:id",validateListing,WrapAsync(async(req,res)=>{ 
    let {id} = req.params;
 await listing.findByIdAndUpdate(id,{...req.body.listings});
  req.flash("success","Listing  Updated successfully");

 res.redirect(`/listings/${id}`);
}));

//Delete route
router.delete("/:id",WrapAsync(async(req,res)=>{
    let {id} = req.params;
const del_list = await listing.findByIdAndDelete(id);
console.log(del_list)
 req.flash("success","Listing  deleted successfully");
    res.redirect("/listings");
}));



module.exports = router;