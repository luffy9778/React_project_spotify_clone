import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const api = axios.create({
  baseURL: "http://localhost:3500",
});


//adding access token with every req
api.interceptors.request.use(
  (config) => {
    const { auth } = useContext(AuthContext);
    const accessToken = auth.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("no a token");
    return Promise.reject(error);
  }
);

//geting new accestoken 
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.config);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          "http://localhost:3500/auth/refresh",
          {},
          { withCredentials: true }
        );
        const accessToken = response.data.accessToken;
        const { setAuth } = useContext(AuthContext);
        setAuth((prv) => ({ ...prv, accessToken }));
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.log("refresh faild", err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
