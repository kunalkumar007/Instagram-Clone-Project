const jwt = require("jsonwebtoken");
const User=require("./user.schema");
module.exports=function(req,res,next){
    const token = req.header("auth_token"); //passed from res.header
    if(!token) return res.status(401).json("Access Denied!");

    try {
        const verified = jwt.verify(token, "kunalkumar"); //this is returned id from token... 
        req.user=verified;  //we can find user by finduserbyid(_id:req.user);
        User.findById(req.user._id)
          .then((data) => {
            // console.log(data);
            req.user=data;
          })
          .catch((err) => res.status(401).json("You must be logged in"));
        next();
    } catch (error) {
        res.status(401).json("You must be logged in")
    }
}