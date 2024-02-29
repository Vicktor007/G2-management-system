import React from "react";
import "./InfoBox.scss";

const InfoBox = ({ bgColor, title, searchText = "text", count, icon, handleButtonClick }) => {
  return (
    <div className={`info-box ${bgColor}`} onClick={() => handleButtonClick && handleButtonClick(searchText)}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text">
        <p><b>{title}</b></p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};
export default InfoBox;
