import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCustomers: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_CUSTOMERS(state, action) {
      const { customers, search } = action.payload;
      const currentDate = new Date();
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 3); // set the expiry date to three months from now
      let tempCustomers = [];

      if (Array.isArray(customers)) {
        if (search.toLowerCase() === "expired") {
          tempCustomers = customers.filter((customer) => {
            const customerExpiryDate = new Date(customer.expiry_date);
            return customerExpiryDate < currentDate;
          });
        } else if (search.toLowerCase() === "expiring") {
          tempCustomers = customers.filter((customer) => {
            const customerExpiryDate = new Date(customer.expiry_date);
            return customerExpiryDate < expiryDate && customerExpiryDate >= currentDate;
          });
        } else if (search.toLowerCase() === "out of stock") {
          tempCustomers = customers.filter((customer) => {
            const customerQuantity = Number(customer.quantity);
            return customerQuantity === 0;
          });
        } else {
          tempCustomers = customers.filter((customer) => {
            const customerName = customer.name ? customer.name.toLowerCase() : "";
            const customerCategory = customer.category ? customer.category.toLowerCase() : "";
            return (
              customerName.includes(search.toLowerCase()) ||
              customerCategory.includes(search.toLowerCase())
            );
          });
        }
      }

      state.filteredCustomers = tempCustomers;
    },
  },
});

export const { FILTER_CUSTOMERS } = filterSlice.actions;

export const selectFilteredCustomers = (state) => state.filter.filteredCustomers;

export default filterSlice.reducer;
