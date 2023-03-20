const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model("User")

const bcrypt = require("bcryptjs")

// const jwt = require("jsonwebtoken")
// const {JWT_SECRET} = require("../keys")

router.post("/signup",(req, res) => {
    // console.log(req.body)
    const {name, email, password, logintype} = req.body
    if (logintype == "email"){
        if (!name || !email || !password){
            return res.status(200).json({"error":"please send all data"})
        }
    }
    User.findOne({email:email})
    .then((saveduser)=>{
        if (saveduser){
            console.log(saveduser);
            return res.status(200).redirect('/signin')
        }
        if (logintype == "email"){
            bcrypt.hash(password,12)
            .then((hashedpass)=>{
                const user = new User({
                    email:email,
                    password:hashedpass,
                    name:name,
                    logintype:logintype
                })
                user.save()
                .then((user)=>{
                    return res.status(200).redirect('/')
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else {
            const user = new User({
                email:email,
                logintype:logintype
            })
            user.save()
            .then((user)=>{
                return res.redirect('/')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.post("/signin", (req, res) => {
    const {email, password, logintype} = req.body
    if (logintype == "email"){
        if (!email || !password){
            return res.status(200).json({"error":"invalid email or pass"})
        }
    }
    User.findOne({email:email})
    .then((saveduser)=>{
        if(!saveduser){
            return res.status(200).json({"error":"invalid user"})
        }

        bcrypt.compare(password, saveduser.password)
        .then((matched)=>{
            if(matched){
                return res.status(200).redirect('/dashboard')
            }
            else{
                return res.status(200).json({"error":"wrong password"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router