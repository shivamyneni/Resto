const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model("User")

const bcrypt = require("bcryptjs")

// const jwt = require("jsonwebtoken")
// const {JWT_SECRET} = require("../keys")

router.get("/", (req, res) => {
    res.send("<h2>Hiiiiiii</h2>")
})

router.post("/signup",(req, res) => {
    // console.log(req.body)
    const {name, email, password} = req.body
    if (!name || !email || !password){
        return res.status(422).json({"error":"please send all data"})
    }
    User.findOne({email:email})
    .then((saveduser)=>{
        if(saveduser){
            return res.status(422).json({"error":"existing user"})
        }
        bcrypt.hash(password,12)
        .then((hashedpass)=>{
            const user = new User({
                email:email,
                password:hashedpass,
                name:name
            })
            user.save()
            .then((user)=>{
                return res.json({"message":"user saved successfully"})
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.post("/signin", (req, res) => {
    const {email, password} = req.body
    if (!email || !password){
        return res.status(422).json({"error":"invalid email or pass"})
    }
    User.findOne({email:email})
    .then((saveduser)=>{
        if(!saveduser){
            return res.status(422).json({"error":"invalid user"})
        }
        bcrypt.compare(password, saveduser.password)
        .then((matched)=>{
            if(matched){
                // return res.json({"message":"user found"})
                // const token = jwt.sign({_id:saveduser._id}, JWT_SECRET)
                const {_id, name, email} = saveduser
                res.status(200).json({"user":{_id,name,email}})
            }
            else{
                return res.status(200).json({"message":"wrong password"})
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