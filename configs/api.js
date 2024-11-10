import axios from "axios";


import { getCookie, removeCookie } from "../utils/cookie";

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const api = axios.create({
  baseURL: baseUrl,
  // baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((request) => {
  const token = getCookie("token");

  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }

  return request;
},(error) =>{
  return Promise.reject(error)
});

api.interceptors.response.use((response) => {
  return response;
}
// (error) => {
//   console.log(error)
  // if((error.response.status === 401 || error.response.status === 403)) {
  //   console.log("response => ", error)
  //   removeCookie();
  //   navigate('/login')
  // }
// }
);

export default api;
