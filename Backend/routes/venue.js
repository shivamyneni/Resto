const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Venue = mongoose.model('Venue')

router.post("/addvenue", (req, res) =>{
    const {name, address, info, sports,timeslots, chargable} = req.body
    const venue = new Venue({
        name: name,
        info: info,
        address: address,
        sports: sports,
        timeslots: timeslots
    })
    venue.save()
    .then((activity) => {
        return res.json({"message":"venue saved successfully"})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get("/viewvenues", (req, res) => {
    Venue.find({})
    .then((allvenues) => {
        // console.log(allvenues)
        if (!allvenues){
            return res.status(200).json({"error":"no venues"})
        }
        return res.status(200).json({"allvenues":allvenues})
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router