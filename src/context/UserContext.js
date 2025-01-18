import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "./AuthContext";
import { io } from "socket.io-client";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.accessToken) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/user");
        setUserData(response.data);
      } catch (error) {
        // console.log(error)////////////
      }
    };
    fetchData();
  }, [auth]);
  console.log(userData);

  /////////for soket.io//////////////

  useEffect(() => {
    if (auth?.accessToken) {
      const socket = io("http://localhost:3500");
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
      const response = await axiosPrivate.post("/likedsongs", { songId: id });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        addLikedSong,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
