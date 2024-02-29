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
        } else if (search.toLowerCase() === "pending") {
          tempCustomers = customers.filter((customer) => {
            const pendingLicense = (customer.production_date);
            return pendingLicense === "";
          });
        }else if (search.toLowerCase() === "trainees") {
            tempCustomers = customers.filter((customer) => {
              const customerCompletionDate = new Date(customer.date_of_completion);
              return customerCompletionDate > currentDate;
            });
          }  else if (search.toLowerCase() === "owing") {
              tempCustomers = customers.filter((customer) => {
               const amount_paid = parseFloat(customer?.amount_paid);
               const price = parseFloat(customer?.price)
                
                return amount_paid < price
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
