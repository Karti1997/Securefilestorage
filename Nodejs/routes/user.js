const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.post("/signup",(req,res,next)=>{
const db="mongodb://localhost:27017/Fileupload";
bcrypt.hash(req.body.password,10)
.then(hash =>{
    const user = new User({
        firstname:req.body.firstname,
        username:req.body.username,
        password:hash,
        confirmpassword:hash,
        email:req.body.email,
        phoneno:req.body.phoneno
});
user.save().then(result => {
    res.status(201).json({
        message: 'User Created',
        id:result._id
    });
}).catch(err=>{
    res.status(500).json({
        error:err
    })
}); 
});
}); 


router.post("/login",(req,res,next)=>{
    let fetchedUser;
    console.log(req.body.username);
    console.log(req.body.password);
    User.findOne({ username: req.body.username})
        .then(user =>{
            if(!user){
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUser=user;
            return bcrypt.compare(req.body.password,user.password);
            })
            .then(result =>{
                if(!result){
                    return res.status(401).json({
                        message:"Auth failed"
                    });
                }
                const token=jwt.sign({username: fetchedUser.username,userId:fetchedUser._id},
                    'secret_this_should_be_longer',
                    {expiresIn:'1h'}
                    );
                    res.status(200).json({
                        token: token,
                        userId: fetchedUser._id
                    });
            })
            .catch(err =>{
                return res.status(401).json({
                    message: "Auth failed"
                });
            });
        });
module.exports=router;
