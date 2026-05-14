const User=require('../models/userModel')

exports.getUser=async(req,res)=>{
    try{
    const id=req.params.user_id
    const userData=await User.findById(id)
   
    return res.json({userData:userData})
    }
    catch(error){
      return res.status(500).json("error fetching user")
    }
   
}