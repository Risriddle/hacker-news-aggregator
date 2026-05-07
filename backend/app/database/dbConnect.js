const mongoose=require('mongoose');

const mongoUrl=process.env.MONGODB_URL;

exports.connect_db=async()=>{
try{
await mongoose.connect(mongoUrl)
console.log("db connection sucessful!")
}
catch(error){
console.log("error while connecting to DB",err)    
}
}