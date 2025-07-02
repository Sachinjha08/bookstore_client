// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://bookstore-server-k9xf.onrender.com/api/v1", // match backend port
  withCredentials: true, // important for sending cookies
});

export default instance;
