import  { useContext } from 'react'
import AuthContext  from "../context/AuthContext"
import axios from 'axios'
const useRefreshToken = () => {
    const {setAuth}=useContext(AuthContext)

    const refresh=async()=>{
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
            { withCredentials: true }
          );
          console.log("refreshtoken")
          setAuth(prv=>{
            return {...prv,
            accessToken:response.data.accessToken,
            roles:response.data.roles,
          user:response.data.name}
        })
          return response.data.accessToken
      } catch (error) {
        console.log(error,"from refresh")
      }
     
    }
  return refresh
}

export default useRefreshToken