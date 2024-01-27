const Customer = require('../models/customerModel');

const cloudinary = require('cloudinary').v2;
const router = require('express').Router();
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

router.delete('/:public_id', async(req, res)=> {
  const {public_id} = req.params;
  try {
      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(public_id);

      // Find customer that contains the image
      const customer = await Customer.findOne({ 'documents.public_id': public_id });

      if (customer) {
        // Remove the image from the customer's images array
        customer.documents = customer.documents.filter(image => image.public_id !== public_id);

        // Save the customer
        await customer.save();
      }

      res.status(200).send();
  } catch (e) {
      res.status(400).send(e.message)
  }
})



module.exports = router;
