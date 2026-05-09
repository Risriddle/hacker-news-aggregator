import {AuthContext} from "../context/AuthContext"
import {useContext} from 'react'
import {Navigate} from 'react-router-dom'

export const ProtectedRoute=({children})=>{
   const {user,token} =useContext(AuthContext)
   console.log(user ,token,"in protected route")
   if(!token){
    return <Navigate to="/login" replace/>
   }

   return children
}