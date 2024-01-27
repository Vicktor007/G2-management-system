import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const uploadImg = async (data) => {
  const response = await axios.post(`${BACKEND_URL}upload/`, data);
  return response.data;
};
const deleteImg = async (id) => {
  const response = await axios.delete(
    `${BACKEND_URL}upload/delete-img/${id}`
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
