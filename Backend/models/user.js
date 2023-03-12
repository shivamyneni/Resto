const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true 
    },
    password:{
        type: String
    },
    isOwner:{
        type: Boolean
    },
    phone:{
        type: String
    },
    city:{
        type: String
    },
    interests:{
        type: [String]
    },
    logintype:{
        type: String
    }
})

mongoose.model("User",userSchema)