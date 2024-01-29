import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import axios from "../../axios";
import CustomerForm from "../../components/customer/customerForm/CustomerForm";
import { createAnewCustomer, selectIsLoading } from "../../redux/features/customer/customerSlice";
selectIsLoading


const initialState = {
  name: "",
  category: "",
  license_type: "",
  price: "",
  amount_paid: "",
  production_date: "",
  expiry_date: "",
  details: "",
  date_of_completion: "",
  registeration_date: ""
};

const AddCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(initialState);
  const [customerImage, setCustomerImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [documents, setDocuments] = useState([]);
    const [documentToRemove, setDocumentToRemove] = useState(null);
  const isLoading = useSelector(selectIsLoading);

  const { name, category, price, amount_paid, license_type, production_date, expiry_date, details, registeration_date, date_of_completion } = customer

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleImageChange = (e) => {
    setCustomerImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  
 

  const generateCustomer_id = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const customer_Id = letter + "-" + number;
    return customer_Id;
  };

  

function showWidget() {
  const widget = window.cloudinary.createUploadWidget(
      {
          cloudName: "vickdawson",
          uploadPreset: "lzye0s0v",
          secure: true,
      },
      (error, result) => {
          if (!error && result.event === "success") {
              setDocuments((prev) => [...prev, { url: result.info.secure_url, public_id: result.info.public_id }]);
          }
      }
  );
  widget.open();
}


  async function handleRemoveDocuments(imgObj) {
    setDocumentToRemove(imgObj.public_id);
    try {
        const res = await axios.delete(`/api/images/${imgObj.public_id}/`);
        setDocumentToRemove(null);
        setDocuments((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
    } catch (e) {
        console.log(e);
    }
}


  const saveCustomer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("customer_id", generateCustomer_id(category));
    formData.append("category", category);
    formData.append("license_type", license_type);
    formData.append("price", price);
    formData.append("amount_paid", amount_paid);
    formData.append("production_date", production_date);
    formData.append("expiry_date", expiry_date);
    formData.append("details", details);
    formData.append("registeration_date", registeration_date);
    formData.append("date_of_completion", date_of_completion);
    formData.append("passport_photo", customerImage);
    formData.append("documents", JSON.stringify(documents))
    
    
    


    const newCustomer = await dispatch(createAnewCustomer(formData));
    navigate(`/customer-detail/${newCustomer.payload._id}`);
    console.log(newCustomer)

  };

  

  return (
    <div className="--pad displayflex">
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Customer</h3>
      <CustomerForm
        customer={customer}
        customerImage={customerImage}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        saveCustomer={saveCustomer}
        showWidget={showWidget}
        handleRemoveDocuments={handleRemoveDocuments}
        documentToRemove={documentToRemove}
        documents={documents}
      />
    </div>
  );
};

export default AddCustomer;
