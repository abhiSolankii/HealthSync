import axios from "axios";

const apiRequest = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV_PROD === "true"
      ? "https://health-sync-six.vercel.app/api"
      : "http://localhost:4000/api",
  withCredentials: true,
});

export default apiRequest;
