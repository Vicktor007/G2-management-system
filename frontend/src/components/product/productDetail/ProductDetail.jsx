import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import calculateExpiryDate from '../../../utilities/expiry';
import stockStatus from '../../../utilities/stockStatus';
import "./ProductDetail.scss";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import moment from "moment";




const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const [select, setSelect] = useState(0);
  

  
let expiryDate = "";

if (product) {
expiryDate = calculateExpiryDate(product.expiry_date);
}


let expiryString = "";
if (expiryDate !== "expired") {
  if (expiryDate.years > 0) {
    expiryString += `${expiryDate.years} ${expiryDate.years > 1 ? 'years' : 'year'}, `;
  }
  if (expiryDate.months > 0) {
    expiryString += `${expiryDate.months} ${expiryDate.months > 1 ? 'months' : 'month'}, `;
  }
  expiryString += `${expiryDate.days} ${expiryDate.days > 1 ? 'days' : 'day'}`;
} else {
  expiryString = "expired";
}

  
let displayExpiryDate = expiryDate === "expired" ? "expired" : expiryString;


  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      toast.error("Something went rong, please reload the page");
    }
  }, [isLoggedIn, isError, message, dispatch,id]);

  return (
    <div className="product-detail --pad">
      
     
      {isLoading && <Loader/>}
      <Card cardClass="card">
      <h3 className="--mt p-title">Product Detail</h3>
        {product && (
          <div className="detail">
            <Card cardClass="group image-card">
            {isLoading ? (
              
              <></>
              ) : (
            product?.image ? (
            <img
            src={product.image.filePath}
            alt={product.image.fileName}
          />
          ) : (
          <p>No image set for this product</p>
           )
           )}
            </Card>
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {product.price * product.quantity}
            </p>
            { product.production_date ? (
              <>
                <p>
              <b>&rarr; Production Date : </b> 
              {product.production_date}
            </p>
            <p>
              <b>&rarr; Expiry Date : </b> {product.expiry_date} </p>
            <p>
               <b>&rarr; Expires in : </b> 
               {displayExpiryDate}
            </p>
              </>
            ): (<p>
              <b>&gt;&gt;&gt;Not a perishable product</b>
            </p>)}

            <hr />
            
            <Card cardClass="group image-card">
                <img
                  src={`${product?.images[select]?.url}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex preview-con">
                  {
                    product?.images.map((i, index) => (
                      <div
                      key={i?._id}
                        className={" cursor-pointer documents-preview"}
                      >
                        <img
                        
                          src={`${i?.url}`}
                          alt={`${product.name}`}
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
        
                    ))}
                </div>
              </Card>
                          
          
          <hr/>
            <p>{product.description}</p>
            
            <hr />
            <code className="--color-dark">
              Created on: {moment(product.createdAt).format("MMMM Do YYYY")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {moment(product.updatedAt).format("MMMM Do YYYY")}
            </code>
            <div>
            <Link to={`/edit-product/${id}`} className="edit" >
            Edit Product
            </Link>
            {/* <Link to={`/li-productdetail/${id}`} className="edit" >
            Create Product QRcode
            </Link> */}
            </div>
          </div>
          
        )}
      </Card>
                        
    </div>
  );
};

export default ProductDetail;
