
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
    const id=req.params.id
    if(!id){
        return res.status(404).json({message:"id not found"})
    }
    const story=await Story.findById({_id:id})
    if(!story){
        return res.status(404).json({message:"story not found"})
    }
    isBookmarked=story.bookmarked
    console.log(isBookmarked,"is bookmarked-----------")
    if(isBookmarked){
        const toggle=story.bookmarked=false
        await Story.findByIdAndUpdate(id,{bookmarked:toggle})
    }
    else{
        const toggle=story.bookmarked=true
        await Story.findByIdAndUpdate(id,{bookmarked:toggle})
    }
    
    return res.json({sucess:true,message:"bookmark toggle done!"})
    }
    catch(error){
        console.log("error while bookmarking",error)
        return res.json({message:"error while bookmarking"})
    }
    
}



exports.getBookmarkedStories=async(req,res)=>{
    
    try{
        const stories=await Story.find({bookmarked:true})
        return res.json({result:stories})
    }
    catch(error){
        console.log("error fetching all bookmarked stories",error)
        return res.status(500).json({message:"Error fetching all bookmarked stories"})
    }
    
}