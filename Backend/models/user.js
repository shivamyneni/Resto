const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true 
    },
    password:{
        type: String,
        required: true 
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
    }
})

mongoose.model("User",userSchema)