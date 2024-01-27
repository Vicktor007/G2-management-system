const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true
    },
    customer_id: {
        type: String,
        required: true,
        default: "Customer's id",
        trim: true
    },
    category: {
        type: String,
        required: [true, "Please add a category"],
        trim: true
    },
    license_type: {
        type: String,
        required: [true, "Please add a quantity"],
        trim: true
    },
    price: {
        type: String,
        required: [true, "Please add a price"],
        trim: true
    },
    amount_paid: {
        type: String,
        required: [true, "Please add a price"],
        trim: true
    },
    details: {
        type: String,
        required: [true, "Please add a description"],
        trim: true
    },
    passport_photo: {
        fileName: {
            type: String,
            default: ""
        },
        filePath: {
            type: String,
            default: ""
        },
        fileType: {
            type: String,
            default: ""
        },
        fileSize: {
            type: String,
            default: ""
        },
        public_id: {
            type: String,
            default: ""
        }
    },
    

    documents: [{
        public_id: String,
        url: String
      }],
      

   production_date: {
            type: String,
            default: "",
        required: false,
        
        trim: true
        },
   expiry_date: {
            type: String,
            default: "",
        required: false,
        trim: true
        },

   registeration_date: {
            type: String,
            default: "",
        required: false,
        
        trim: true
        },
   date_of_completion: {
            type: String,
            default: "",
        required: false,
        trim: true
        }
    
  },
  {
    timestamps: true,
})

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;


