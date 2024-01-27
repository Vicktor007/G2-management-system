const dotenv = require("dotenv").config();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require("path");

cloudinary.config({
  cloud_name: 'vickdawson',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Expiry-Tracker',
    public_id: (req, file) => new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
  },
});


//   specify file fomat that can be saved

// const fileFilter (req, file, cb) {
    // if (file.mimetype.startsWith('image/')) {
        // cb(null, true);  // accept the file
    // } else {
        // cb(null, false);  // reject the file
    // }  
// }

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};


const upload = multer({ storage, fileFilter });

module.exports = {
    upload
};