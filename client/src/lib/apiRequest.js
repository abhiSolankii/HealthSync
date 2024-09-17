import axios from "axios";
const apiRequest = axios.create({
  baseURL: "http://localhost:4000/api", //for dev
  //   baseURL: "https://homeheaven-realestate.onrender.com/api", //for deployment
  withCredentials: true,
});
export default apiRequest;
