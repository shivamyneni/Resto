const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Book = mongoose.model("bookings")

router.get("/:userId", (req,res) => {
    Book.find({userId:req.params.userId})
    .then((bookings) => {
        if (!bookings){
            return res.status(200).json({"error":"non existing venue"})
        }
        return res.status(200).json({"bookings":bookings})
    })
})

module.exports = router;