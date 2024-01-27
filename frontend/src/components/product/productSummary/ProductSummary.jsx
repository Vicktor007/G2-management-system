import React, { useEffect } from "react";
import "./ProductSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { LuBadgeX } from "react-icons/lu";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_EXPIRED_PRODUCTS,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  CALC_EXPIRING_IN_THREE_MONTHS,
  selectCategory,
  selectExpiredProducts,
  selectOutOfStock,
  selectTotalStoreValue,
  selectThreeMonthsExpiryTracker,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

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

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);
  const expired_products = useSelector(selectExpiredProducts);
  const expires_in_three_months =useSelector(selectThreeMonthsExpiryTracker);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
    dispatch(CALC_EXPIRED_PRODUCTS(products));
    dispatch(CALC_EXPIRING_IN_THREE_MONTHS(products));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
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
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
        <InfoBox
          icon={expiredProductsIcon}
          title={"Expired Products"}
          count={expired_products}
          bgColor="card3"
        />
        <InfoBox
          icon={expiredProductsIcon}
          title={"Expiring Products"}
          count={expires_in_three_months}
          bgColor="card5"
        />
      </div>

      <button className="button"><Link className="link" to={"/add-product/"}> <MdAddShoppingCart size={35}/>Add Product</Link></button>
    </div>
  );
};

export default ProductSummary;
