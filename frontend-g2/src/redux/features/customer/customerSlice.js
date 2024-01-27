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
            // console.log(action.payload);
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
            // console.log(action.payload);
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

  export const {CALC_CATEGORY} = customerSlice.actions

  export const selectIsLoading = (state) => state.customer.isLoading;
  export const selectCustomer = (state) => state.customer.customer;
  export const selectCategory = (state) => state.product.category;

  export default customerSlice.reducer;