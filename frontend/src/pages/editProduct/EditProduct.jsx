import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import "./ProductForm.scss";
import axios from "../../axios"

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);
  
 

    

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

   
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);

    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("production_date", product?.production_date);
    formData.append("expiry_date", product?.expiry_date);
    formData.append("description", product?.description);
    if (images) {
      formData.append("images", JSON.stringify(images));
    };
    if (productImage) {
      formData.append("image", productImage);
    }


    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    // navigate("/dashboard");
    navigate(`/product-detail/${product._id}`)
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
        dispatch(getProduct(id));
        setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
    } catch (e) {
        console.log(e);
    }
}

  return (
    <div className="width --pad displayflex">
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
         product={product}
         productImage={productImage}
         handleInputChange={handleInputChange}
         saveProduct={saveProduct}
         showWidget={showWidget}
         handleRemoveImages={handleRemoveImages}
         imageToRemove={imageToRemove}
         images={images}
         imagePreview={imagePreview}
         productEdit={productEdit}
         handleImageChange={handleImageChange}
      />

    </div>
  );
};

export default EditProduct;
