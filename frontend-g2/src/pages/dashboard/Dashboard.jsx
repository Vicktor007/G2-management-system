import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getAllCustomers } from "../../redux/features/customer/customerSlice";
import CustomersList from "../../components/customer/customerList/CustomersList";
import CustomersSummary from "../../components/customer/customersSummary/CustomersSummary";




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
      {/* <CustomersSummary customers={customers} /> */}
      <CustomersList customers={customers} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
