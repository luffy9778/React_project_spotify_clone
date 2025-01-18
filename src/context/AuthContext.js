import { createContext, useState } from "react";

const AuthContext = createContext({});

export const  AuthProvider = ({ children }) => {
 const [auth,setAuth]=useState({})
//  const[persist,setPersist]=useState(JSON.parse(localStorage.getItem("persist")) || false)
 const[persist,setPersist]=useState(false)
 
return(
    <AuthContext.Provider
    value={{
        auth,setAuth,persist
    }}>
        {children}
    </AuthContext.Provider>
)

}
export default AuthContext;
