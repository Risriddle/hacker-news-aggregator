import {AuthContext} from "../context/AuthContext"
import {useContext} from 'react'
import {Navigate} from 'react-router-dom'

export const ProtectedRoute=({children})=>{
   const {user,token} =useContext(AuthContext)

   if(!user || !token){
    return <Navigate to="/login" replace/>
   }

   return children
}