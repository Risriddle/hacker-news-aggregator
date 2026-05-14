const express=require('express')
const Router=express.Router()
const userController=require('../controllers/userController')
const { verifyJwt_token } = require("../middleware/authMiddleware")


Router.get('/getUser/:user_id',verifyJwt_token,userController.getUser)

module.exports=Router;