import React, { useEffect } from "react";
import "./CustomerSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { LuBadgeX } from "react-icons/lu";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiPassPendingLine } from "react-icons/ri";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { TbUsersGroup } from "react-icons/tb";
import { MdOutlineGroupRemove, MdPersonAddAlt1 } from "react-icons/md";
import { MdAddShoppingCart, MdPendingActions } from "react-icons/md";
import { CALC_AMOUNT_OWED, CALC_CATEGORY, CALC_CUSTOMERS_IN_TRAINING, CALC_CUSTOMERS_WITH_PENDING_LICENSES, CALC_OWING_CUSTOMERS, CALC_STORE_VALUE, selectCategory, selectPendingLicenses, selectStudentsInTraining, selectTotalAmountOwed, selectTotalOwingCustomers, selectTotalStoreValue } from "../../../redux/features/customer/customerSlice";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;
const expiredProductsIcon = <LuBadgeX size={40} color="#fff" /> 
const pending = <RiPassPendingLine size={40} color="#fff"/>
const owed = <FaHandHoldingDollar size={40} color="#fff"/>
const trainees = <TbUsersGroup size={40} color="#fff"/>;
const owingCustomers = <MdOutlineGroupRemove size={40} color="#fff"/>


// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CustomersSummary = ({ customers, handleButtonClick }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const totalOwingCustomers = useSelector(selectTotalOwingCustomers);
  const totalAmountOwed = useSelector(selectTotalAmountOwed);
  const customersInTraining = useSelector(selectStudentsInTraining);
  const pendingLicenses = useSelector(selectPendingLicenses);


  useEffect(() => {
    dispatch(CALC_CATEGORY(customers));
    dispatch(CALC_STORE_VALUE(customers));
    dispatch(CALC_AMOUNT_OWED(customers));
    dispatch(CALC_OWING_CUSTOMERS(customers));
    dispatch(CALC_CUSTOMERS_IN_TRAINING(customers));
    dispatch(CALC_CUSTOMERS_WITH_PENDING_LICENSES(customers));
  }, [dispatch, customers]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Customer Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={trainees}
          title={"Total Customers"}
          count={customers?.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}  `}
          bgColor="card2"
        />
        <InfoBox
          icon={owed}
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
          icon={owingCustomers}
          title={"Owing Customers"}
          count={totalOwingCustomers}
          bgColor="card3"
          searchText="owing"
          handleButtonClick={handleButtonClick}
        />
        <InfoBox
          icon={trainees}
          title={"Trainees"}
          count={customersInTraining}
          bgColor="card5"
          searchText="trainees"
          handleButtonClick={handleButtonClick}
        />
        <InfoBox
          icon={pending}
          title={"Pending Licenses"}
          count={pendingLicenses}
          bgColor="card5"
          searchText="pending"
          handleButtonClick={handleButtonClick}
        />
      </div>

      <button className="button"><Link className="link" to={"/add-customer/"}> <MdPersonAddAlt1 size={35}/>Add Customer</Link></button>
    </div>
  );
};

export default CustomersSummary;
