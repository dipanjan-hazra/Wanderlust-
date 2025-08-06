const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const listingSchema = new Schema({
 title:{
        type:String,
        required : true
    } ,
description: String,
    image:{

        url:{
             type:String,
             default:"https://plus.unsplash.com/premium_photo-1673137434249-b507ce137543?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=> v.trim() ===""? "https://plus.unsplash.com/premium_photo-1673137434249-b507ce137543?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
        }
       
        
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
            type:Schema.Types.ObjectId,
            ref:"Review"
        }],

    owner:{
        type :Schema.Types.ObjectId,
        ref:"User",
    }
});


listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})
const listing = mongoose.model("listing",listingSchema);
module.exports = listing;