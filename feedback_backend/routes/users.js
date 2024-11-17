const express=require("express");
const router=express.Router();
const Users = require("../model/user.js");

const userController=require("../controllers/users.js");
const { signUpValidation, loginValidation} = require("../middleware.js");


router.post("/signup",signUpValidation,userController.renderSignupForm);
router.post("/login",loginValidation,userController.renderLoginForm);

module.exports=router;