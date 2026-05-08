const cheerio=require('cheerio');
const axios=require('axios');
const Story=require('../models/storyModel')
const url="https://news.ycombinator.com/"
const {scrapeStories}=require("../scraper")


exports.scrape=async(req,res)=>{
       try{
        scrapeStories();
        return res.json({result:"top 10 Stories added to db!"})
       }
       catch(error){
        console.log("error scraping the site!",error)
        return res.status(500).json({message:"error scraping site!"})
       }
}


