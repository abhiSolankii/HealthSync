import axios from "axios";
const apiRequest = axios.create({
  //for developemt or running in local machine
  // baseURL: "http://localhost:4000/api",

  //for deployment
  baseURL: "https://health-sync-three.vercel.app/api",
  withCredentials: true,
});
export default apiRequest;
