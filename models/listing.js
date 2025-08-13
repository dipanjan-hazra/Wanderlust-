const { ref, string } = require("joi");
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
        url:String,
        filename:String,
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
    },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  filter: {
    // Correct: declare that "filter" is an object, and inside it,
    // "type" is a string with an enum.
    type: { type: String, enum: [
      'Trending','room','iconic cities','moutains','entertainment',
      'lakefront','beach','temple','castels','adventure','resturants','adventures'
    ], required: true }
  }
});





listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})
const listing = mongoose.model("listing",listingSchema);
module.exports = listing;