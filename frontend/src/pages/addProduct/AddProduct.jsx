import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import axios from "../../axios";


const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  production_date: "",
  expiry_date: "",
  description: "",
  
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState([]);
    const [imageToRemove, setImageToRemove] = useState(null);
  const isLoading = useSelector(selectIsLoading);

  const { name, category, price, quantity, production_date, expiry_date, description } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  
 

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  
//   function showWidget() {
//     const widget = window.cloudinary.createUploadWidget(
//         {
//             cloudName: "vickdawson",
//             uploadPreset: "lzye0s0v",
//         },
//         (error, result) => {
//             if (!error && result.event === "success") {
//                 setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
//             }
//         }
//     );
//     widget.open();
// }

function showWidget() {
  const widget = window.cloudinary.createUploadWidget(
      {
          cloudName: "vickdawson",
          uploadPreset: "lzye0s0v",
          secure: true, // Add this line
      },
      (error, result) => {
          if (!error && result.event === "success") {
              setImages((prev) => [...prev, { url: result.info.secure_url, public_id: result.info.public_id }]);
          }
      }
  );
  widget.open();
}


  async function handleRemoveImages(imgObj) {
    setImageToRemove(imgObj.public_id);
    try {
        const res = await axios.delete(`/api/images/${imgObj.public_id}/`);
        setImageToRemove(null);
        setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
    } catch (e) {
        console.log(e);
    }
}


  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("production_date", production_date);
    formData.append("expiry_date", expiry_date);
    formData.append("description", description);
    formData.append("image", productImage);
    formData.append("images", JSON.stringify(images))
    
    
    


    const newProduct = await dispatch(createProduct(formData));
    navigate(`/product-detail/${newProduct.payload._id}`);

  };

  

  return (
    <div className="--pad displayflex">
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        saveProduct={saveProduct}
        showWidget={showWidget}
        handleRemoveImages={handleRemoveImages}
        imageToRemove={imageToRemove}
        images={images}
      />
    </div>
  );
};

export default AddProduct;
