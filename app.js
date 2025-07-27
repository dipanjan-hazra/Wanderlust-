const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const  path =require("path");
const methodOverride= require("method-override");
const ejsMate = require("ejs-mate");
const WrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const { error } = require("console");
const {listingSchema} = require("./schema.js");
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


// app.get("/testlisting",async (req,res)=>{
//     let sample = new listing({
//         title: "My new Vila",
//         description: "By the Beach",
//         price: 12200,
//         location:"Goa",
//         country: "India"

//     });
//     await sample.save();
//     console.log("Sample was save ");
//     res.send("Sample working");
// })


const  validateListing = (req,res,next)=>{
     let {error} = listingSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(" , ");
    throw new ExpressError(400, errMsg );
   }else{
    next();
   }
}


const  validateReview = (req,res,next)=>{
     let {error} = reviewSechema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(" , ");
    throw new ExpressError(400, errMsg );
   }else{
    next();
   }
}
// index route
app.get("/listings",WrapAsync(async(req,res,next)=>{
 
   const all =await listing.find({});
   res.render("listings/index.ejs",{all});
    
}));
// new ROute 💢
app.get("/listings/new",(req,res)=>{
    res.render("listings/Newfrom.ejs")
});


// view -- show page , 
app.get("/listings/:id",WrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing_data = await listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing_data});
}));

//create Route
app.post("/listings",validateListing, WrapAsync(async(req,res)=>{
    const list = new listing(req.body.listings);
    console.log(list);
    await list.save();
    res.redirect("/listings");
}));

//edit list
app.get("/listings/:id/edit",WrapAsync(async (req,res)=>{
   let {id} = req.params;
    const listing_data = await listing.findById(id);
    res.render("listings/edit.ejs",{listing_data});
})) ;
//update route 
app.put("/listings/:id",WrapAsync(async(req,res)=>{ 
    let {id} = req.params;
 await listing.findByIdAndUpdate(id,{...req.body.listings});
 res.redirect(`/listings/${id}`);
}),validateListing);

//Delete route
app.delete("/listings/:id",WrapAsync(async(req,res)=>{
    let {id} = req.params;
const del_list = await listing.findByIdAndDelete(id);
console.log(del_list)
    res.redirect("/listings");
}));

//Reviews 
// Post Route 
    app.post("/listings/:id/reviews",validateReview, WrapAsync (async(req,res,next)=>{
       let Listing = await listing.findById(req.params.id)
       let newReview = new Review(req.body.review);
       Listing.reviews.push(newReview);

  
      await newReview.save();
      await Listing.save();
      res.redirect(`/listings/${Listing._id}`);
    }));

    // Delete review Route 
    app.delete("/listings/:id/reviews/:reviewId" ,WrapAsync (async(req,res,next)=>{
        let {id ,reviewId} = req.params;

        await listing.findByIdAndUpdate(id ,{$pull:{reviews : reviewId}});

        await Review.findByIdAndDelete(reviewId); 
        res.redirect(`/listings/${id}`);
    }));
// app.all("*", (req, res, next) => {
//     console.log(" hiii " )
//     let err = new ExpressError(500,"Page Not found");
//     next(err);
// });

app.use((err,req,res,next)=>{
    let {statusCode =500 , message =" Somthing went wrong"} = err; 
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{err});
});
app.listen(8080,()=>{
    console.log("server is  Listening to port 8080");
});


