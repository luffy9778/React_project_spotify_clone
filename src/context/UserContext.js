import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "./AuthContext";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const[userData,setUserData]=useState([])
    // const[currentSong,setCurrentSong]=useState("")
  const axiosPrivate = useAxiosPrivate();
  const {auth}=useContext(AuthContext)
  
  useEffect(() => {
    if(!auth.accessToken){
      return
    }
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/user");
        setUserData(response.data)
      } catch (error) {
        // console.log(error)////////////
      }
    };
    fetchData();
  }, [auth]);

  return <UserContext.Provider value={{
    userData,setUserData
  }}>
    {children}
    </UserContext.Provider>;
};
export default UserContext;
