const jwt=require('jsonwebtoken');
require("dotenv").config();


exports.verifyJwt_token=(req,res,next)=>{
    const token=req.headers['authorization']?.split(' ')[1];
    
    const secret=process.env.JWT_SECRET_KEY;
   
    if(!token){
        return res.status(401).json({message:"Unauthorized access!"})
    }
    try{
        const decoded=jwt.verify(token,secret);
        req.user=decoded
        next();
    }
    catch(error){
        return res.status(403).json({message:"forbidden access:invalid or expired token"})
    }
    
}