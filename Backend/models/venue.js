const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    info:{
        type: String
    },
    city:{
        type: String
    },
    address:{
        type: String
    },
    state:{
        type: String
    },
    sports:{
        type: [String]
    },
    dropdown:{
        type: [String]
    },
    rent:{
        type: Boolean
    }
})

mongoose.model("Venue",venueSchema)