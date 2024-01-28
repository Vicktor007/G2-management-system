import React, { useEffect } from "react";
import "./ProductSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { LuBadgeX } from "react-icons/lu";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { CALC_AMOUNT_OWED, CALC_CATEGORY, CALC_OWING_CUSTOMERS, CALC_STORE_VALUE, selectCategory, selectTotalAmountOwed, selectTotalOwingCustomers, selectTotalStoreValue } from "../../../redux/features/customer/customerSlice";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;
const expiredProductsIcon = <LuBadgeX size={40} color="#fff" /> 

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CustomersSummary = ({ customers }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const totalOwingCustomers = useSelector(selectTotalOwingCustomers);
  const totalAmountOwed = useSelector(selectTotalAmountOwed);


  useEffect(() => {
    dispatch(CALC_CATEGORY(customers));
    dispatch(CALC_STORE_VALUE(customers));
    dispatch(CALC_AMOUNT_OWED(customers));
    dispatch(CALC_OWING_CUSTOMERS(customers));
  }, [dispatch, customers]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Customers"}
          count={customers.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}  `}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Amount Owed"}
          count={`$${formatNumbers(totalAmountOwed.toFixed(2))}  `}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category?.length}
          bgColor="card4"
        />
        <InfoBox
          icon={expiredProductsIcon}
          title={"Owing Customers"}
          count={totalOwingCustomers}
          bgColor="card3"
        />
        {/* <InfoBox
          icon={expiredProductsIcon}
          title={"Expiring Products"}
          count={expires_in_three_months}
          bgColor="card5"
        /> */}
      </div>

      <button className="button"><Link className="link" to={"/add-customer/"}> <MdAddShoppingCart size={35}/>Add Customer</Link></button>
    </div>
  );
};

export default CustomersSummary;
