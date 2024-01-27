const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;



// create customer
const createCustomer = asyncHandler(async(req, res) =>{
  const {name, customer_id, category, license_type, price, amount_paid, details, documents, production_date, expiry_date, registeration_date, date_of_completion} = req.body

  

  // validation
  if(!name || !category  || !price ) {
      res.status(400)
      throw new Error("Please fill in all fields")
  }


  let fileData = {}
  if(req.file) {
      fileData = {
          fileName: req.file.originalname,
          filePath: req.file.path,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2), 
          public_id: req.file.filename, // use filename as public_id
      }
  }
  const parsedImages = JSON.parse(documents);



  try {
    // create customer
    const customer = await Customer.create({
    user: req.user.id,
    name,
      customer_id,
      category,
      license_type,
      price,
      amount_paid,
      details,
      production_date,
      expiry_date,
      registeration_date,
      date_of_completion,
      documents: parsedImages,
      passport_photo: fileData
})

res.status(201).json(customer);
console.log(customer);
  }
  catch(error) {
    res.status(400).json(error.message);
    console.log(error);
  }
});

// get all customers
const getCustomers = asyncHandler(async (req, res) => {
   const customers = await Customer.find({user: req.user.id}).sort("-createdAt")
   res.status(200).json(customers)
})


// Get single Customer
const getCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    // if customer doesnt exist
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    // Match customer to its user
    if (customer.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    res.status(200).json(customer);
  });

//   // Get single customer
// const getCustomerDetail = asyncHandler(async (req, res) => {
//   const customer = await Customer.findById(req.params.id);
//   // if customer doesnt exist
//   if (!customer) {
//     res.status(404);
//     throw new Error("Customer not found");
//   }

//   res.status(200).json(customer);
// });


// Delete Customer

const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  // if customer doesn't exist
  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  // Match customer to its user
  if (customer.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Delete image from Cloudinary
  try {
    // Extract the public ID of the image from the file path
    let publicId = customer.image.public_id;

    // Delete the image using the public ID
    let result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      throw new Error("Failed to delete image from Cloudinary");
    }
  } catch (error) {
    console.error(error);  // Log the original error message
    res.status(500);
    throw new Error("Image could not be deleted from Cloudinary: " + error.message);
  }

  // Delete customer from database
  await Customer.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Customer deleted successfully." });
});



// Update Customer details
const updateCustomerDetails = asyncHandler(async (req, res) => {
  const {name, category, license_type, price, amount_paid, details, documents, production_date, expiry_date, registeration_date, date_of_completion} = req.body
  const { id } = req.params;

  const customer = await Customer.findById(id);

  // if customer doesnt exist
  if (!customer) {
    res.status(404);
    throw new Error("customer not found");
  }
  // Match customer to its user
  if (customer.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Delete previous image from cloudinary
    if (customer.image && customer.image.public_id) {
      try {
        await cloudinary.uploader.destroy(customer.image.public_id);
      } catch (error) {
        res.status(500);
        console.error("Previous image could not be deleted", error);
      }
    }

    // Save new image to cloudinary
    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
      public_id: req.file.filename, // use filename as public_id
    };
  }
  const parsedImages = JSON.parse(documents);

  const existingImages = customer.documents;

  const allImages = existingImages.concat(parsedImages);

  
  // Update customer
  const updateCustomerDetails = await Customer.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      license_type,
      price,
      amount_paid,
      details,
      production_date,
      expiry_date,
      passport_photo: Object.keys(fileData).length === 0 ? customer?.passport_photo : fileData,
      documents: allImages,
      registeration_date,
      date_of_completion
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updateCustomerDetails);
});
;

  




module.exports = {
    createCustomer,
    updateCustomerDetails,
    getCustomer,
    
    getCustomers,
    deleteCustomer
}