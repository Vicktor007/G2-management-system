import React from "react";

const stockStatus = (quantity) => {
  if (quantity > 0) {
    return <span className="--color-success">In Stock</span>;
  }
  return <span className="--color-danger">Out Of Stock</span>;
};

export default stockStatus;
