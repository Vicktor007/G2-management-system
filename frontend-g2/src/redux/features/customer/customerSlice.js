import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customerService from "./customerService";
import { toast } from "react-toastify";


const initialState = {
    customer: null,
    customers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    totalStoreValue: 0,
    totalAmountOwed: 0,
    totalOwingCustomers: 0,
    studentsInTraining: 0,
    pendingLicenses : 0 || "",
    category: [],
};


// Create a new customer
export const createAnewCustomer = createAsyncThunk(
  "customers/create",
  async (formData, thunkAPI) => {
    try {
      return await customerService.createNewCustomer(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get all customers
export const getAllCustomers = createAsyncThunk(
    "customers/getAll",
    async (_, thunkAPI) => {
      try {
        return await customerService.getAllCustomers();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  // Delete a Customer
export const deleteACustomer = createAsyncThunk(
    "customers/delete",
    async (id, thunkAPI) => {
      try {
        return await customerService.deleteACustomer(id);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  // Get a customer
export const getACustomer = createAsyncThunk(
    "customers/getCustomer",
    async (id, thunkAPI) => {
      try {
        return await customerService.getACustomer(id);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  // Update a customer details
export const updateACustomerDetails = createAsyncThunk(
    "customers/updateCustomer",
    async ({ id, formData }, thunkAPI) => {
      try {
        return await customerService.updateACustomerDetails(id, formData);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  

  const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
      CALC_STORE_VALUE(state, action) {
        const customers = action.payload;
        let totalValue = 0;
        if (Array.isArray(customers)) {
          customers.forEach((item) => {
            let { price } = item;
            price = parseFloat(price);
            if (!isNaN(price)) {
              totalValue += price;
            }
          });
        }
        state.totalStoreValue = totalValue;
      },
    
      CALC_OWING_CUSTOMERS(state, action) {
        const customers = action.payload;
        let owingCustomers = 0;
        if (Array.isArray(customers)) {
          customers.forEach((item) => {
            let { price, amount_paid } = item;
            price = parseFloat(price);
            amount_paid = parseFloat(amount_paid);
            if (price > amount_paid) {
              owingCustomers += 1;
            }
          });
        }
        state.totalOwingCustomers = owingCustomers;
      },
    
      CALC_AMOUNT_OWED(state, action) {
        const customers = action.payload;
        let totalOwed = 0;
        if (Array.isArray(customers)) {
          customers.forEach((item) => {
            let { price, amount_paid } = item;
            price = parseFloat(price);
            amount_paid = parseFloat(amount_paid);
            if (price > amount_paid) {
              totalOwed += (price - amount_paid);
            }
          });
        }
        state.totalAmountOwed = totalOwed;
      },
    
      CALC_CATEGORY(state, action) {
        const customers = action.payload;
        const array = [];
        if (Array.isArray(customers)) {
          customers.map((item) => {
            const { category } = item;
            return array.push(category);
          });
        }
        const uniqueCategory = [...new Set(array)];
        state.category = uniqueCategory;
      },

      CALC_CUSTOMERS_IN_TRAINING(state, action) {
        const customers = action.payload;
        let count = 0;
        if(Array.isArray(customers)) {
          customers.forEach((item) => {
           let {date_of_completion} = item;

           date_of_completion = new Date(date_of_completion);
           const today = new Date();
           if(date_of_completion > today) {
            count += 1;
           }
          });
        }
        state.studentsInTraining = count;
      },
      CALC_CUSTOMERS_WITH_PENDING_LICENSES(state, action) {
        const customers = action.payload;
        let count = 0;
        if(Array.isArray(customers)) {
          customers.forEach((item) => {
           let {production_date} = item;
           if(production_date === "") {
            count += 1;
           }
          });
        }
        state.pendingLicenses = count;
      }
    },
    
    extraReducers: (builder) => {
        builder
          .addCase(createAnewCustomer.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createAnewCustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.customers.push(action.payload);
            toast.success("customer added successfully");
          })
          .addCase(createAnewCustomer.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(getAllCustomers.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAllCustomers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.customers = action.payload;
          })
          .addCase(getAllCustomers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(deleteACustomer.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteACustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Customer deleted successfully");
          })
          .addCase(deleteACustomer.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(getACustomer.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getACustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.customer = action.payload;
          })
          .addCase(getACustomer.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })    
    
          .addCase(updateACustomerDetails.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateACustomerDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("customer updated successfully");
          })
          .addCase(updateACustomerDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          });
      },
    
    
  });

  export const {CALC_CATEGORY,CALC_CUSTOMERS_WITH_PENDING_LICENSES, CALC_STORE_VALUE, CALC_AMOUNT_OWED, CALC_OWING_CUSTOMERS, CALC_CUSTOMERS_IN_TRAINING} = customerSlice.actions

  export const selectIsLoading = (state) => state.customer.isLoading;
  export const selectCustomer = (state) => state.customer.customer;
  export const selectCategory = (state) => state.customer.category;
  export const selectTotalStoreValue = (state) => state.customer.totalStoreValue;
  export const selectTotalAmountOwed = (state) => state.customer.totalAmountOwed;
  export const selectTotalOwingCustomers = (state) => state.customer.totalOwingCustomers;
  export const selectStudentsInTraining = (state) => state.customer.studentsInTraining;
  export const selectPendingLicenses = (state) => state.customer.pendingLicenses 



  export default customerSlice.reducer;

  