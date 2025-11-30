const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const WrapAsync = require("../utils/WrapAsync.js");
const {validateListing,isLoggedin, isOwner} =require("../middleware.js");
const multer  = require('multer');
const{storage}=require("../cloudConfig.js");

const upload = multer({storage});
//controler -- 
const listingControler = require("../controlers/listing.js");


// new listing adding -- 

router.get("/new",isLoggedin,listingControler.renderAddListingForm);
//router.route -- 
router.route("/")
    .get(WrapAsync(listingControler.index)) // index route
    .post(isLoggedin,upload.single("listings[image]"), WrapAsync(listingControler.NewListing)) //create route

// routes/listings.js (express)

router.get('/filter/:slug', listingsControler.filterBySlug);




router.route("/:id")
    .get(WrapAsync(listingControler.show)) //show page
    .put(isLoggedin,isOwner,upload.single("listings[image]"),validateListing,WrapAsync(listingControler.UpdateListing)) //update listing
    .delete(isLoggedin,isOwner,WrapAsync(listingControler.DeleteListing)); //Delete listing

router.get("/:id/edit",isLoggedin,isOwner,WrapAsync(listingControler.editPage));
// module.exports = router;





// GET filter results

module.exports = router;
