import axios from "axios";

const apiRequest = axios.create({
  //for deployment
  baseURL: "https://health-sync-six.vercel.app/api",

  //for development
  // baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default apiRequest;
