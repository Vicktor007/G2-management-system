import React from "react";
import loaderImg from "../../assets/loader2.gif";
import ReactDOM from "react-dom";
import "./Loader.scss";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
      <img src={loaderImg} alt="Loading..." className="loader-img" />

      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = ({classes}) => {
  return (
    <div className={` --center-all ${classes}`}>
      <img src={loaderImg} alt="Loading..." className="loader-img" />

    </div>
  );
};

export const LoaderDiv = ({classes}) => {
  return (
    <div className="loader-container">
      <div className={` loaderDiv ${classes}`}>
    </div>
    </div>
  );
};

export default Loader;
