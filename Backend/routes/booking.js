const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Book = mongoose.model("bookings")
const moment = require('moment');
router.get("/:uid", (req,res) => {
    Book.find({uid:req.params.uid})
    .then((bookings) => {
        if (!bookings){
            return res.status(200).json({"error":"non existing venue"})
        }
        return res.status(200).json({"bookings":bookings})
    })
})

router.post("/booknow", (req, res) =>{
    const { activityid, userId } = req.body;
    console.log("-----------------",activityid)
    const date = moment(new Date())
    const myDateString = date.format('YYYY-MM-DD');
    const myDateMoment = moment(myDateString);
    // return res.status(200).json({"date":dateObject})
    Book.find({uid:userId,bookingDate:myDateMoment,activityid:activityid})
    .then((booking) => {
        // console.log(booking)
        if(booking.length > 0){
            return res.status(200).json({"error":"booking exists"})
        }
        const newBooking = new Book({
            uid: userId,
            activityId: activityid,
            bookingDate: myDateMoment
        });
        newBooking.save()
        .then((newBooking) => {
            return res.json({"message":"booking details saved successfully"})
        })
        .catch((err) => {
            console.log(err)
        })
    })
} )

module.exports = router;