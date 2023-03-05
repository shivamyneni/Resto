const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Activity = mongoose.model('Activity')
const Venue = mongoose.model('Venue')

router.post("/addActivity", (req, res)=>{
    const {name, venueid, city,timeslot,availability} = req.body
    if(!name || !venueid || !city || !timeslot || !availability ){
        return res.send({"error":"please enter all the details"})
    }
    Venue.find({venueid:venueid})
    .then((venue)=>{
        if (venue.length===0){
            return res.send({"error":"venue doesn't exists"})
        }
        const newActivity = new Activity({
            name: name,
            venueid: venueid,
            city: city,
            timeslot: timeslot,
            availability: availability,
        })
        newActivity.save()
        .then((newActivity) => {
            return res.json({"message":"venue details saved successfully",activity:{newActivity}})
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.post("/:venueid", (req, res) => {
    Activity.find({venueid:req.params.venueid})
    .then((activities) => {
        if (!activities){
            return res.status(200).json({"404":"activities not available"})
        }
        return res.send({activities:activities})
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.use("/", (req, res) => {
    Activity.find({})
    .then((activities) => {
        if (!activities){
            return res.status(200).json({"404":"activities not found"})
        }
        
        return res.send({activities:activities})
        })
        .catch((err)=>{
            console.log(err)
        })
    })

module.exports = router