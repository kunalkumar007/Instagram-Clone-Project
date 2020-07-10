const express = require('express');
const router=express.Router();
const mongoose = require('mongoose');
const User=require("./user.schema");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const login = require("./token.jwt");

router.get("/",(req,res)=>{
    res.send("Hello");
});
router.get("/protected",login,(req,res)=>{
  res.json("Hello World!");
})

router.post("/signup",(req,res)=>{
    const {name,email,password} = req.body;
    if(!email || !password || !name)
    {
      return  res.status(402).json({error:"Please Enter All Fields"});
    }
    
    User.findOne({ email: email })
      .then((data) => {
        if (data) {
          return res.status(422).json({error:"Please Login"});
        } 
        bcrypt.hash(password,12)
        .then(hashpassword=>{
            const user = new User({
              name,
              email,
              password:hashpassword,
            });
            user
              .save()
              .then((data) => res.json(data))
              .catch((err) => res.status(400).json(err.message));
        })
          
        
      })
      .catch((err) => res.status(400).json(err.message));
    
})
router.post("/login",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json("Enter Credentials!");
    }
    User.findOne({email:email})
    .then(data=>{
        if(!data){
            return res.status(422).json("Please Sign Up!");
        }
        bcrypt
          .compare(password, data.password)
          .then((match) => {
            if (match) {
            //   return res.json("Login Success!!");
            const token=jwt.sign({_id:data._id},"kunalkumar")
            // res.json(token)
            const { _id,name,email} = data;
            res.header("auth_token", token).json({token,user:{_id,name,email}});
            }
            return res.status(422).json("Login Failure!");
          })
          .catch((err) => res.status(400).json(err));
    })
    .catch(err=>res.status(400).json(err));
})

module.exports=router;