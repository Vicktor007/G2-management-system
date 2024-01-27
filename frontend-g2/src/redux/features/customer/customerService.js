import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/customers/`;

// Create a New Customer
const createNewCustomer = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all Customers
const getAllCustomers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Customer
const deleteACustomer = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Customer
const getACustomer = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// // Get a Customer for non user
// const getACustomerDetailsForNonUser = async (id) => {
//   const response = await axios.get(`${API_URL}/details/${id}`);
//   return response.data;
// };
// Update Customer
const updateACustomerDetails = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const customerService = {
  createNewCustomer,
  getACustomer,
  getAllCustomers,
  updateACustomerDetails,
  deleteACustomer
};

export default customerService;
