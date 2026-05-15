const  User=require("../models/userModel")
const bcrypt=require("bcrypt")
require("dotenv").config();
const jwt=require("jsonwebtoken")

exports.register=async(req,res)=>{
try{
    
    const {email,password}=req.body;
    const user=User.find({email})
    const hashedPassword=await bcrypt.hash(password,10)

    await User.create({
        email:email,
        password:hashedPassword
    })
   return  res.json({result:"User registered!"})
}
catch(error){
    console.log("Error registering user",error)
    return res.status(500).json({message:"error registering user"})
}

}





exports.login=async(req,res)=>{
    try{
    const {email,password}=req.body;
    const user=await User.findOne({
        email
    }).select('+password')
    
    if(!user){
        return res.status(404).json({message:"No user found!"})
    }
    
    const isPasswordValid=await bcrypt.compare(password,user.password);
    
    if(!isPasswordValid){
    return res.status(401).json({message:"Invalid Credentials"})
    }
    const token=generateJWT_token(user._id)
    const refreshToken=generateRefresh_token(user._id)

    res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure:true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
    });
    return res.json({success:true,jwtToken:token,data:user})
}
catch(error){
    console.log("Error logging user",error)
    return res.status(500).json({message:"error logging user"})
}

}



exports.sendAccessToken=async(req,res)=>{
     const token=req.cookies.refreshToken
     if(!token){
        return res.status(401).json({message:"no refresh token found!"})
     }

     try{
          const decoded=jwt.verify(token,process.env.REFRESH_SECRET_KEY)
          const accessToken=generateJWT_token(decoded.id)
          const refToken=generateRefresh_token(decoded.id)
          res.cookie('refreshToken',refToken,{
            httpOnly:true,
            sameSite:'strict',
            secure:true,
            maxAge:24*60*60*1000
          })
          return res.status(200).json({accessToken:accessToken})

     }
     catch(error){
        return res.status(401).json({message:"invalid or expired refresh token!"})
     }

}



const generateJWT_token=(id)=>{
    const secret=process.env.JWT_SECRET_KEY;
    const token=jwt.sign({id},secret,{expiresIn:"1h"})
    return token
}

const generateRefresh_token=(id)=>{
    const secret=process.env.REFRESH_SECRET_KEY;
    const refreshToken=jwt.sign({id},secret,{expiresIn:"1d"})
    return refreshToken
}

