const express=require('express')
const Router=express.Router();
const scrapeController=require("../controllers/scrapeController")
const storiesController=require("../controllers/storiesController")

Router.post('/scrape',scrapeController.scrape)
Router.get("/stories",storiesController.getAll)
Router.get("/stories/:id",storiesController.getOne)

module.exports=Router;