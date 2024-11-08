import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "./AuthContext";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const[likedSongs,setLikedSongs]=useState([])

  const axiosPrivate = useAxiosPrivate();
  const {auth}=useContext(AuthContext)
  
  useEffect(() => {
    if(!auth.accessToken){
      return
    }
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/likedsongs");
        console.log(response.data,"d")
        setLikedSongs(response.data)
      } catch (error) {
        // console.log(error)////////////
      }
    };
    fetchData();
    // setTimeout(() => {
    //   console.log("refreshed");
    //   fetchData();
    // }, 35000);
  }, [auth]);

  return <UserContext.Provider value={{
    likedSongs,setLikedSongs
  }}>
    {children}
    </UserContext.Provider>;
};
export default UserContext;
