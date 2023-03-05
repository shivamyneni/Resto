const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    venueid:{
        type: String,
        required: true
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
    rent:{
        type: Boolean
    },
    images:{
        type:[String]
    }
})

mongoose.model("Venue",venueSchema)