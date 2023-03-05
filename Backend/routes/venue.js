const { query } = require('express')
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Venue = mongoose.model('Venue')

router.use("/activities",require('./activity'))

router.post("/addVenue", (req, res)=>{
    const {name, venueid, city,address,state,sports,rent,images} = req.body
    console.log(venueid)
    if(!name || !venueid || !city || !address || !state || !sports || !rent ){
        return res.send({"error":"please enter all the details"})
    }
    Venue.findOne({venueid:venueid})
    .then((venue)=>{
        console.log(venue)
        if (venue){
            return res.status(200).json({"error":"venue already exists"})
        }
        const newVenue = new Venue({
            name: name,
            venueid: venueid,
            city: city,
            address: address,
            sports: sports,
            rent:rent,
            images:images
        })
        newVenue.save()
        .then((venue) => {
            return res.json({"message":"venue details saved successfully",venue:{venue}})
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
    return res.send({"result":"successful"})
})

router.use("/:city", (req, res) => {
    Venue.find({city:req.params.city})
    .then((venues) => {
        if (!venues){
            return res.status(200).json({"404":"venues not found"})
        }
        
        return res.send({venues:venues})
        })
        .catch((err)=>{
            console.log(err)
    })
})

router.use("/", (req, res) => {
    Venue.find({})
    .then((venues) => {
        if (!venues){
            return res.status(200).json({"404":"venues not found"})
        }
        
        return res.send({venues:venues})
        })
        .catch((err)=>{
            console.log(err)
        })
    })

module.exports = router