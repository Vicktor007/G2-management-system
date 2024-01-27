

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   filteredProducts: [],
// };

// const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     FILTER_PRODUCTS(state, action) {
//       const { products, search } = action.payload;
//       const currentDate = new Date();
//       const expiryDate = new Date();
//       expiryDate.setMonth(expiryDate.getMonth() + 3); // set the expiry date to three months from now
//       let tempProducts = [];

//       if (Array.isArray(products)) {
//         if (search.toLowerCase() === "expired") {
//           tempProducts = products.filter((product) => {
//             const productExpiryDate = new Date(product.expiry_date);
//             return productExpiryDate < currentDate;
//           });
//         } else if (search.toLowerCase() === "expiring") {
//           tempProducts = products.filter((product) => {
//             const productExpiryDate = new Date(product.expiry_date);
//             return productExpiryDate < expiryDate && productExpiryDate >= currentDate;
//           });
//         } else {
//           tempProducts = products.filter((product) => {
//             const productName = product.name ? product.name.toLowerCase() : "";
//             const productCategory = product.category ? product.category.toLowerCase() : "";
//             return (
//               productName.includes(search.toLowerCase()) ||
//               productCategory.includes(search.toLowerCase())
//             );
//           });
//         }
//       }

//       state.filteredProducts = tempProducts;
//     },
//   },
// });

// export const { FILTER_PRODUCTS } = filterSlice.actions;

// export const selectFilteredProducts = (state) => state.filter.filteredProducts;

// export default filterSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const currentDate = new Date();
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 3); // set the expiry date to three months from now
      let tempProducts = [];

      if (Array.isArray(products)) {
        if (search.toLowerCase() === "expired") {
          tempProducts = products.filter((product) => {
            const productExpiryDate = new Date(product.expiry_date);
            return productExpiryDate < currentDate;
          });
        } else if (search.toLowerCase() === "expiring") {
          tempProducts = products.filter((product) => {
            const productExpiryDate = new Date(product.expiry_date);
            return productExpiryDate < expiryDate && productExpiryDate >= currentDate;
          });
        } else if (search.toLowerCase() === "out of stock") {
          tempProducts = products.filter((product) => {
            const productQuantity = Number(product.quantity);
            return productQuantity === 0;
          });
        } else {
          tempProducts = products.filter((product) => {
            const productName = product.name ? product.name.toLowerCase() : "";
            const productCategory = product.category ? product.category.toLowerCase() : "";
            return (
              productName.includes(search.toLowerCase()) ||
              productCategory.includes(search.toLowerCase())
            );
          });
        }
      }

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
