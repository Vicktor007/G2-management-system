import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ProductList from "../../components/product/productList/ProductList";
// import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getAllCustomers } from "../../redux/features/customer/customerSlice";
import CustomersList from "../../components/customer/productList/CustomersList";




const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { customers, isLoading, isError, message } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllCustomers());
    }

    if (isError) {
      console.log(message);
      
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="--pad">
      {/* <ProductSummary products={products} /> */}
      <CustomersList customers={customers} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
