const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const WrapAsync = require("../utils/WrapAsync.js");
const {validateListing,isLoggedin, isOwner} =require("../middleware.js");



router.get("/",WrapAsync(async(req,res,next)=>{
 
   const all =await listing.find({});
   res.render("listings/index.ejs",{all});
    
}));
// new ROute 💢
router.get("/new",isLoggedin,(req,res)=>{
    res.render("listings/Newfrom.ejs")

});


// view -- show page , 
router.get("/:id",WrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing_data = await listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author"}, //nested populate
    }).populate("owner");
    if(!listing_data){
        req.flash("error","Listing You  want  to  access doesnot exist !")
       return res.redirect("/listings");
    }
    console.log(listing_data);
    res.render("listings/show.ejs",{listing_data});
 
}));

//create Route
router.post("/",isLoggedin,validateListing, WrapAsync(async(req,res)=>{
    const list = new listing(req.body.listings);
    list.owner = req.user._id;
    await list.save();
    req.flash("success","new  listings Added");
    res.redirect("/listings");
}));

//edit list
router.get("/:id/edit",isLoggedin,isOwner,WrapAsync(async (req,res)=>{
   let {id} = req.params;
    const listing_data = await listing.findById(id);
    if(!listing_data){
        req.flash("error","Listing You  want  to  edit doesnot exist !")
       return res.redirect("/listings");
    }

    res.render("listings/edit.ejs",{listing_data});
})) ;

//update route 
router.put("/:id",isLoggedin,isOwner,validateListing,WrapAsync(async(req,res)=>{ 
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listings});
    req.flash("success","Listing  Updated successfully");

 res.redirect(`/listings/${id}`);
}));

//Delete route
router.delete("/:id",isLoggedin,isOwner,WrapAsync(async(req,res)=>{
let {id} = req.params;
const del_list = await listing.findByIdAndDelete(id);
console.log(del_list)
 req.flash("success","Listing  deleted successfully");
    res.redirect("/listings");
}));



module.exports = router;