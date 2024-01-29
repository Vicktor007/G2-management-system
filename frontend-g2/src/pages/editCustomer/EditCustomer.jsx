import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import "./CustomerForm.scss";
import axios from "../../axios"
import CustomerForm from "../../components/customer/customerForm/CustomerForm";
import { getACustomer, selectCustomer, selectIsLoading, updateACustomerDetails } from "../../redux/features/customer/customerSlice";



const EditCustomer
 = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const customerEdit = useSelector(selectCustomer);

  const [customer, setCustomer] = useState(customerEdit);
  const [customerImage, setCustomerImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [documentToRemove, setDocumentToRemove] = useState(null);
  
 

    

  useEffect(() => {
    dispatch(getACustomer(id));
  }, [dispatch, id]);

  useEffect(() => {
    setCustomer(customerEdit);

    setImagePreview(
      customerEdit && customerEdit.passport_photo ? `${customerEdit.passport_photo.filePath}` : null
    );

   
  }, [customerEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleImageChange = (e) => {
    setCustomerImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveCustomer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", customer?.name);

    formData.append("category", customer?.category);
    formData.append("license_type", customer?.license_type);
    formData.append("amount_paid", customer?.amount_paid);
    formData.append("price", customer?.price);
    formData.append("production_date", customer?.production_date);
    formData.append("expiry_date", customer?.expiry_date);
    formData.append("description", customer?.details);
    formData.append("registeration_date", customer?.registeration_date);
    formData.append("date_of_completion", customer?.date_of_completion);
    if (documents) {
      formData.append("documents", JSON.stringify(documents));
    };
    if (customerImage) {
      formData.append("passport_photo", customerImage);
    }

    


    await dispatch(updateACustomerDetails({ id, formData }));
    await dispatch(getACustomer());
    // navigate("/dashboard");
    navigate(`/customer-detail/${customer._id}`)
  };


function showWidget() {
  const widget = window.cloudinary.createUploadWidget(
      {
          cloudName: "vickdawson",
          uploadPreset: "lzye0s0v",
          secure: true, // Add this line
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
        dispatch(getACustomer(id));
        setDocuments((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
    } catch (e) {
        console.log(e);
    }
}

  return (
    <div className="width --pad displayflex">
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Customer details</h3>
      <CustomerForm
         customer={customer}
         customerImage={customerImage}
         handleInputChange={handleInputChange}
         saveCustomer={saveCustomer}
         showWidget={showWidget}
         handleRemoveDocuments={handleRemoveDocuments}
         documentToRemove={documentToRemove}
         documents={documents}
         imagePreview={imagePreview}
         customerEdit={customerEdit}
         handleImageChange={handleImageChange}
      />

    </div>
  );
};

export default EditCustomer
;
