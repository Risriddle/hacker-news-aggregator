const express=require('express');
const app=express();
const port=8000;
const storyRouter=require("./app/routes/story");
const authRouter=require("./app/routes/auth")

require('dotenv').config();
const dbConnect=require('./app/database/dbConnect')


dbConnect.connect_db();

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
