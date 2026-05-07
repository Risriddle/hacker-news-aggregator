const express=require('express');
const app=express();
const port=8000;
const storyRouter=require("./app/routes/story");
const { scrape } = require('./app/controllers/scrapeController');
require('dotenv').config();
const dbConnect=require('./app/database/dbConnect')

dbConnect.connect_db();
app.use("/api/",storyRouter)


app.listen(port,function(err)
{
    if(err)
        {
            console.log("error while starting server")
        }
    else{
        console.log("server started at:"+port)
    }})
