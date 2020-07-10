const express = require('express');
const app=express();
const mongoose = require('mongoose');
const User=require("./user.schema");
const Post =require("./post.schema");
const cors = require("cors");//for Cors Policy to localhost:3000 ...

// db connected !!
mongoose.connect(
  "mongodb://localhost/instagram",
  { useNewUrlParser: true, 
   useUnifiedTopology: true },
  () => console.log("DB Connected!!")
);
mongoose.connection
.on("error",(err)=>console.log(err.message));

// usage of server ******/
app.use(cors());
app.use(express.json());
app.use(require("./auth.route"));
app.use(require("./post.route"));

// server connected !!
app.listen(5000,()=>console.log("Server Connected to",5000));
