const  User=require("../models/userModel")
const bcrypt=require("bcrypt")

exports.register=async(req,res)=>{
try{
    
    const {email,password}=req.body;
    const hashedPassword=bcrypt.hash(password,10)

    await User.create({
        email:email,
        password:hashedPassword
    })
    res.json({result:"User registered!"})
}
catch(error){
    console.log("Error registering user",error)
    res.status(500).json({message:"error registering user"})
}

}



exports.login=async(req,res)=>{
    try{
    const {email,password}=req.body;
    const user=await User.findOne({
        email
    }).select('+password')

    if(!user){
        req.status(404).json({message:"No user found!"})
    }
    
    const isPasswordValid=bcrypt.compare(user.password,password);
    if(!isPasswordValid){
    req.status(401).json({message:"Invalid Credentials"})
    }

    res.json({result:"User logged in!; "+user})
}
catch(error){
    console.log("Error logging user",error)
    res.status(500).json({message:"error logging user"})
}

}