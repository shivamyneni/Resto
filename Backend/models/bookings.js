const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    customerId:{
        type:String
    },
    paymentIntentId:{
        type:String
    },
    venueName:{
        type:String,
        required:true
    },
    court: {
        type:String,
        required:true
    },
    time: {
        type:String,
        required: true
    },
    payment_status:{
        type:String,
        required:true
    }
})

const book = mongoose.model("bookings",bookingSchema)

exports.book =  book;