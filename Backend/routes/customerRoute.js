const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { upload } = require("../utils/fileUploads");
const { createCustomer, updateCustomerDetails, getCustomer, getCustomers, deleteCustomer } = require("../controllers/customerController");




router.post("/", protect, upload.single("passport_photo"), createCustomer);
router.patch("/:id", protect, upload.single("passport_photo"), updateCustomerDetails);
router.get("/", protect, getCustomers);
router.get("/:id", protect, getCustomer);
// router.get("/details/:id", getCustomerDetail);
router.delete("/:id", protect, deleteCustomer);





module.exports = router;   