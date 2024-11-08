import axios from 'axios'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const LogoutCotainer = () => {
    const{setAuth}=useContext(AuthContext)
    const handleLogout=async()=>{
        try {
            const response=await axios.post("http://localhost:3500/auth/logout",
                {},
                {withCredentials: true}
            )
            setAuth({})
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='logout'>
        <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LogoutCotainer