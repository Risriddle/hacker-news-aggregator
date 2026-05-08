const express=require('express')
const Router=express.Router();
const scrapeController=require("../controllers/scrapeController")
const storiesController=require("../controllers/storiesController")
const { verifyJwt_token } = require("../middleware/authMiddleware")

Router.post('/scrape',scrapeController.scrape)
Router.get("/stories",storiesController.getAll)
Router.get("/stories/:id",storiesController.getOne)
Router.post("/stories/:id/bookmark",verifyJwt_token,storiesController.bookmark)

module.exports=Router;