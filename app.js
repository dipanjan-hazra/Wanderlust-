const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const  path =require("path");
const methodOverride= require("method-override");
const ejsMate = require("ejs-mate");

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

// index route
app.get("/listings",async(req,res)=>{
   const all =await listing.find({});
   res.render("listings/index.ejs",{all});
});
// create new 
app.get("/listings/new",(req,res)=>{
    res.render("listings/Newfrom.ejs")
});


// view --
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing_data = await listing.findById(id);
    res.render("listings/show.ejs",{listing_data});
});

//add list
app.post("/listings",async(req,res)=>{
    // let {title,description,image,price,location,country} = req.body;

    //or
    const list = new listing(req.body.listings);
    console.log(list);
    await list.save();
    res.redirect("/listings");
});

//edit list
app.get("/listings/:id/edit",async (req,res)=>{
   let {id} = req.params;
    const listing_data = await listing.findById(id);
    res.render("listings/edit.ejs",{listing_data});
});

app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
 await listing.findByIdAndUpdate(id,{...req.body.listings});
 res.redirect(`${id}`);
});

//Delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
const del_list = await listing.findByIdAndDelete(id);
console.log(del_list)
    res.redirect("/listings");
});
app.listen(8080,()=>{
    console.log("server is  Listening to port 8080");
});


