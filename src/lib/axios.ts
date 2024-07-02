import Axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("session");

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axios;
