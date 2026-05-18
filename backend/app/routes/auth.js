const express=require("express")
const Router=express.Router();
const authController=require("../controllers/authController")

Router.post("/register",authController.register)
Router.post("/login",authController.login)
Router.post("/logout",authController.logout)
Router.post("/refreshToken",authController.sendAccessToken)

module.exports=Router