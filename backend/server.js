const express=require('express');
const app=express();
const port=8000;
const storyRouter=require("./app/routes/story");
const authRouter=require("./app/routes/auth")
const {scrapeStories}=require("./app/scraper")
const cors=require("cors")

require('dotenv').config();
const dbConnect=require('./app/database/dbConnect')

const corsOptions={
    origin:'http://localhost:5173/',
    methods:['GET','POST'],
    allowedHeaders:['Content-Type','Authorization']
}
app.use(cors())
dbConnect.connect_db();
scrapeStories();
app.use(express.json())


app.use("/api/",storyRouter)
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
