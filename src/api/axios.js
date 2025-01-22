import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});



export default axiosPrivate;
