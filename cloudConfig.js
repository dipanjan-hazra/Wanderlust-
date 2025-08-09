const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDE_NAME,
    api_key:process.env.CLOUDE_APIKEY,
    api_secret:process.env.CLOUDE_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Wanderlust_DEV',
    allowedFormats: ["png","jpg","jepg"],
  },
});

module.exports ={
    cloudinary,
    storage,
}