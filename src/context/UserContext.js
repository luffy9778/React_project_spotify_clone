import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "./AuthContext";
import { io } from "socket.io-client";
import { Flip, toast } from "react-toastify";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  const fetchUserData = async () => {
    try {
      const response = await axiosPrivate.get("/user");
      setUserData(response.data);
    } catch (error) {
      // console.log(error)////////////
    }
  };

  useEffect(() => {
    if (!auth.accessToken) {
      return;
    }
    fetchUserData();
  }, [auth]);

  /////////for soket.io//////////////

  useEffect(() => {
    if (auth?.accessToken) {
      const socket = io(process.env.REACT_APP_API_URL);
      console.log("usersoket");
      socket.emit("userOnline", userData._id);
      return () => {
        socket.disconnect();
      };
    }
  }, [userData]);

  //liked song
  const addLikedSong = async (id) => {
    try {
      await axiosPrivate.post("/likedsongs", { songId: id });
      fetchUserData();
      toast.success(`added to Liked Songs `, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    } catch (error) {
      toast.error(`somthing went wrong! `, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };
  const removeLikedSong = async (songId) => {
    try {
      await axiosPrivate.delete(`/likedsongs/${songId}`);
      fetchUserData();
      toast.warn(`Removed song form Liked `, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    } catch (error) {
      toast.error(`somthing went wrong! `, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        addLikedSong,
        fetchUserData,
        removeLikedSong,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
