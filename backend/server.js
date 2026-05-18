const express=require('express');
const app=express();
const port=8000;
const storyRouter=require("./app/routes/story");
const userRouter=require("./app/routes/user");
const authRouter=require("./app/routes/auth")
const {scrapeStories}=require("./app/scraper")
const cors=require("cors")

require('dotenv').config();
const dbConnect=require('./app/database/dbConnect')

const corsOptions={
    origin:'http://localhost:5173',
    methods:['GET','POST'],
    credentials:true,
    allowedHeaders:['Content-Type','Authorization']
}
app.use(cors(corsOptions))
dbConnect.connect_db();

app.use(express.json())

// scrapeStories();

app.use("/api/",storyRouter)
app.use("/api/user/",userRouter)
app.use("/api/auth/",authRouter)

app.listen(port,function(err)
{
    if(err)
        {
            console.log("error while starting server")
        }
    else{
        console.log("server started at:"+port)
    }})
