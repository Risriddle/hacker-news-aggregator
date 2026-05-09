import {AuthContext} from "./AuthContext"
import {useState} from 'react'

export const AuthProvider=({children})=>{


    const[user,setUser]=useState(null)
    const[token,setToken]=useState(localStorage.getItem('token'))

    const login=(userData,jwt)=>{
        setUser(userData)
        setToken(jwt)
        localStorage.setItem('token',jwt)
    
    }

    const logout=()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

return(
    <AuthContext.Provider value={{user,token,login,logout}}>
        {children}
    </AuthContext.Provider>
)
}