const Joi = require('joi');
const jwt=require("jsonwebtoken");
const signUpValidation=(req,res,next)=>{
    const userSchema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),

         password:Joi.string().min(4).max(100).required()  
    }).required();

    const {error}=userSchema.validate(req.body);
    if(error){
       return res.status(400).json({message:"validation failed", error}); 
      }
      else{
        next();
      }
};

const loginValidation=(req,res,next)=>{
    const userSchema = Joi.object({
        email: Joi.string()
            .email()
            .required(),

         password:Joi.string().min(4).max(100).required()  
    }).required();

    const {error}=userSchema.validate(req.body);
    if(error){
       return res.status(400).json({message:"Bad requests", error}); 
      }
      else{
        next();
      }
};

// feedback validation middleware

const isAuthorized=(req,res,next)=>{
     const token=req.headers["authorization"].split(" ")[1];;
     if(!token){
      return res.status(403).json({message:"Unauthorized. JWT token is required"});
     }
     try{
         const decodeToken=jwt.verify(token, process.env.JWT_SECRET);
         req.user=decodeToken;
         next();
     }catch(error){
      res.status(500).json({message:"Unauthorized, JWT token wrong or expired"})
     }
}



module.exports={signUpValidation,loginValidation,isAuthorized};

