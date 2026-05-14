
const Story=require("../models/storyModel")
const User=require("../models/userModel")

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


exports.getOne=async(req,res)=>{
    try{
        const id=req.params.id
        const story=await Story.findById({_id:id})
        return res.json({result:story})
    }
    catch(error){
        console.log("Error while fetching a story",error)
        res.status(500).json({message:"error while fetching a story"})
    }
}




exports.bookmark=async(req,res)=>{
    try{
    const story_id=req.params.id
    const user_id=req.user.id
   
console.log(user_id,"user id in bookmrk api")
    if(!story_id){
        return res.status(404).json({message:"id not found"})
    }

    const story=await Story.findById({_id:story_id})
    if(!story){
        return res.status(404).json({message:"story not found"})
    }
   
    const isPresent=(await User.findById(user_id)).bookmarks.includes(story_id)

    if(!isPresent){
        
        const user=await User.findByIdAndUpdate(user_id,{$push:{bookmarks:story_id}},{ after: true })
        return res.json({success:true,message:"bookmark toggle done!",user:user})
    }
    else{
        
       const user= await User.findByIdAndUpdate(user_id,{$pull:{bookmarks:story_id}},{ after: true })
       return res.json({success:true,message:"bookmark toggle done!",user:user})
    }
    
    
    }
    catch(error){
        console.log("error while bookmarking",error)
        return res.json({message:"error while bookmarking"})
    }
    
}



exports.getBookmarkedStories=async(req,res)=>{
    const user_id=req.user.id
    try{
        const stories=await User.findById(user_id).populate("bookmarks")
        return res.json({result:stories})
    }
    catch(error){
        console.log("error fetching all bookmarked stories",error)
        return res.status(500).json({message:"Error fetching all bookmarked stories"})
    }
    
}