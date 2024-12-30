import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axiosPrivate from "../api/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { auth } = useContext(AuthContext);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // const accessToken = auth.accessToken;
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        console.log("no a token");
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error?.config;
        if (error?.response?.status === 403 && !originalRequest._retry) {
          console.log("enterd")
          originalRequest._retry = true;
          const accessToken = await refresh();
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
