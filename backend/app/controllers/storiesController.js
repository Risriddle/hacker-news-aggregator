const Story=require("../models/storyModel")

exports.getAll=async(req,res)=>{
    try{
        const stories=await Story.find().sort({score:-1})
        return res.json({result:stories})
    }
    catch(error){
        console.log("error fetching all stories",error)
        return res.status(500).json({message:"Error fetching all stories"})
    }
     
}