const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Book = mongoose.model("bookings")
const Activity = mongoose.model('Activity')
const moment = require('moment');
router.get("/:uid", (req,res) => {
    Book.find({uid:req.params.uid})
    .then((bookings) => {
        if (!bookings){
            return res.status(200).json({"error":"non existing venue"})
        }
        // console.log(bookings)
        const bookingDates = bookings.map(booking => new Date(booking.bookingDate));
        return res.status(200).json({"bookings":bookings,"bookingDates":bookingDates})
    })
})

router.get("/venues/:venueid", (req,res) => {
    Book.find({venueId:req.params.venueid})
    .then((bookings) => {
        if (!bookings){
            return res.status(200).json({"error":"non existing venue"})
        }
        // console.log(bookings)
        const bookingDates = bookings.map(booking => new Date(booking.bookingDate));
        return res.status(200).json({"bookings":bookings,"bookingDates":bookingDates})
    })
})

router.post("/booknow", (req, res) =>{
    const { venueId, venueName, activityName, activityid, userId } = req.body;
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
        Activity.findOneAndUpdate(
            {_id:activityid},
            { $inc: { availability: -1 } },
            function(err, result) {
                if (err) {
                  console.log(err);
                }
                console.log(result);
            }
        )
        const newBooking = new Book({
            uid: userId,
            activityName:activityName,
            venueName:venueName,
            venueId:venueId,
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