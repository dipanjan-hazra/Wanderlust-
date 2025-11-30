
const listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});


module.exports.index = async(req,res,next)=>{
 
   const all =await listing.find({});
   res.render("listings/index.ejs",{all});
    
}

module.exports.renderAddListingForm =(req,res)=>{
    res.render("listings/Newfrom.ejs");
}

module.exports.show = async (req,res)=>{
    let {id} = req.params;
    const listing_data = await listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author"}, //nested populate
    }).populate("owner");
    if(!listing_data){
        req.flash("error","Listing You  want  to  access doesnot exist !");
       return res.redirect("/listings");
    }
    console.log(listing_data);
    res.render("listings/show.ejs",{listing_data});
 
}


module.exports.NewListing = async(req,res)=>{
   let response = await geocodingClient.forwardGeocode({
        query: req.body.listings.location,
        limit: 1,
        })
        .send();
    let url = req.file.path;
    let filename = req.file.filename;
  
    const list = new listing(req.body.listings);
    list.owner = req.user._id;

    list.image ={url,filename};
    list.geometry =response.body.features[0].geometry;
    //filter 
    let c_filter = req.body.listings.filter 
    list.filter = c_filter;

   let  save_list = await list.save();
    console.log("savelisting - "+save_list.filter)
    req.flash("success","new  listings Added");
    res.redirect("/listings");
}

module.exports.editPage = async (req,res)=>{
   let {id} = req.params;
    const listing_data = await listing.findById(id);
    if(!listing_data){
        req.flash("error","Listing You  want  to  edit doesnot exist !")
       return res.redirect("/listings");
    }
    let org_img = listing_data.image.url;
    org_img = org_img.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing_data,org_img});
}

module.exports.UpdateListing = async(req,res)=>{ 
    let {id} = req.params;
    let listing_find = await listing.findByIdAndUpdate(id,{...req.body.listings});
    if(typeof req.file !=="undefined"){ 
    let url = req.file.path;
    let filename = req.file.filename;
    listing_find.image={url,filename}
    await listing_find.save();
    }
    req.flash("success","Listing  Updated successfully");

 res.redirect(`/listings/${id}`);
}

module.exports.DeleteListing = async(req,res)=>{
let {id} = req.params;
const del_list = await listing.findByIdAndDelete(id);
console.log(del_list)
 req.flash("success","Listing  deleted successfully");
    res.redirect("/listings");
} 


module.exports.filterBySlug = async (req, res) => {
  const slug = (req.params.slug || '').trim().toLowerCase();
  if (!slug) {
    req.flash('error', 'Invalid filter');
    return res.redirect('/listings');
  }

  try {
    // exact, case-insensitive match
    const regex = new RegExp(`^${escapeRegExp(slug)}$`, 'i');
    const hotels = await Listing.find({ filter: regex }).lean();

    if (!hotels || hotels.length === 0) {
      req.flash('error', `Oops! No hotels found for "${slug}"`);
      return res.redirect('/listings');
    }

    req.flash('success', `Showing results for ${slug}`);
    return res.render('listings/index.ejs', { all: hotels, activeFilter: slug });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong');
    return res.redirect('/listings');
  }
};