import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import Card from "../../card/Card";
import "./customerDetail.scss";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import moment from "moment";
import { getACustomer } from "../../../redux/features/customer/customerSlice";




const CustomerDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { customer, isLoading, isError, message } = useSelector(
    (state) => state.customer
  );

  const [select, setSelect] = useState(0);
  

  




  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getACustomer(id));
    }

    if (isError) {
      toast.error("Something went rong, please reload the page");
    }
  }, [isLoggedIn, isError, message, dispatch,id]);

  return (
    <div className="product-detail --pad">
      
     
      {isLoading && <Loader/>}
      <Card cardClass="card">
      <h3 className="--mt p-title">Customer Details</h3>
        {customer && (
          <div className="detail">
            <Card cardClass="group image-card">
            {isLoading ? (
              
              <></>
              ) : (
            customer?.passport_photo ? (
            <img
            src={customer.passport_photo.filePath}
            alt={customer.passport_photo.fileName}
          />
          ) : (
          <p>No image set for this customer</p>
           )
           )}
            </Card>
            {/* <h4>Product Availability: {stockStatus(product.quantity)}</h4> */}
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {customer.name}
            </h4>
            <p>
              <b>&rarr; ID : </b> {customer.customer_id}
            </p>
            <p>
              <b>&rarr; Category : </b> {customer.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {customer.price}
            </p>
            <p>
              <b>&rarr; Amount Paid : </b> {"$"}
              {customer.amount_paid}
            </p>
            <p>
              <b>&rarr; Amount Due : </b> {"$"}
              {customer.price - customer.amount_paid}
            </p>
            <p>
              <b>&rarr; License Type : </b> {customer.license_type}
            </p>
            {/* <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {customer.price * customer.quantity}
            </p> */}
            <p>
              <b>&rarr; Registeration Date : </b> 
              {customer.registeration_date}
            </p>
            <p>
              <b>&rarr; Date of Completion : </b> 
              {customer.date_of_completion}
            </p>
            { customer.production_date ? (
              <>
                <p>
              <b>&rarr; Production Date : </b> 
              {customer.production_date}
            </p>
            <p>
              <b>&rarr; Expiry Date : </b> {customer.expiry_date} </p>
            {/* <p>
               <b>&rarr; Expires in : </b> 
               {displayExpiryDate}
            </p> */}
              </>
            ): (<p >
              <b className="badge">&gt;&gt;&gt;Pending License</b>
            </p>)}

            <hr />
            
            <Card cardClass="group image-card">
                <img
                  src={`${ customer && customer.documents && customer.documents[select] ? customer.documents[select].url : ""}`}

                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex preview-con">
                  {
                    customer?.documents?.map((i, index) => (
                      <div
                      key={i?._id}
                        className={" cursor-pointer documents-preview"}
                      >
                        <img
                        
                          src={`${i?.url}`}
                          alt={`${customer.name}`}
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
        
                    ))}
                </div>
              </Card>
                          
          
          <hr/>
          
            <p>{customer.details}</p>
            
            <hr />
            <code className="--color-dark">
              Created on: {moment(customer.createdAt).format("MMMM Do YYYY")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {moment(customer.updatedAt).format("MMMM Do YYYY")}
            </code>
            <div>
            <Link to={`/edit-customer/${id}`} className="edit" >
            Edit
            </Link>
            {/* <Link to={`/li-CustomerDetail/${id}`} className="edit" >
            Create Product QRcode
            </Link> */}
            </div>
          </div>
          
        )}
      </Card>
                        
    </div>
  );
};

export default CustomerDetail;
