const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Activity = mongoose.model('Activity')
const Venue = mongoose.model('Venue')

router.post("/addactivity", (req, res)=>{
    const {venueid, name, timeslot, availability} = req.body
    console.log(venueid)
    Venue.findOne({venueid:venueid})
    .then((venue)=>{
        console.log(venue)
        if (!venue){
            return res.status(200).json({"error":"non existing venue"})
        }
        const activity = new Activity({
            venueid: venueid,
            name: name,
            timeslot: timeslot,
            availability: availability
        })
        activity.save()
        .then((activity) => {
            return res.json({"message":"activity saved successfully"})
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.post("/viewactivity", (req, res) => {
    const {venueid, activityname} = req.body
    Venue.findOne({venueid:venueid})
    .then((venue) => {
        console.log(venue)
        if (!venue){
            return res.status(200).json({"error":"non existing venue"})
        }
        Activity.findOne({name:activityname})
        .then((activity) => {
            if (!activity){
                return res.status(200).json({"error":"non existing activity"})
            }
            return res.status(200).json({"name":activity.name, "info":activity.info, "timeslot": activity.timeslot, "availability": activity.availability})
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