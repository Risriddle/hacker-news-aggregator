const mongoose=require('mongoose')

const storySchema=new mongoose.Schema(
    {
        title:{
            type:String
        },
        url:{
            type:String
        },
        author:{
            type:String
        },
        score:{
            type:Number
        },
        postedAt:{
            type:String
        }
    }
)

const Story= mongoose.model('Story',storySchema)
module.exports=Story;    