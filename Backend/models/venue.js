const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    info:{
        type:String
    },
    address:{
        type: String
    },
    sports:{
        type: [String]
    },
    timeslots:{
        type: [Number]
    },
    Images:{
        type:[String]
    }
})

mongoose.model("Venue",venueSchema)