const  User=require("../models/userModel")
const bcrypt=require("bcrypt")
require("dotenv").config();
const jwt=require("jsonwebtoken")

exports.register=async(req,res)=>{
try{
    
    const {email,password}=req.body;
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
    return res.json({success:true,jwtToken:token,data:user})
}
catch(error){
    console.log("Error logging user",error)
    return res.status(500).json({message:"error logging user"})
}

}



const generateJWT_token=(id)=>{
    const secret=process.env.JWT_SECRET_KEY;
    const token=jwt.sign({id},secret,{expiresIn:"1h"})
    return token
}

