const express=require('express')
const Router=express.Router();
const scrapeController=require("../controllers/scrapeController")

Router.post('/scrape',scrapeController.scrape)

module.exports=Router;