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
        type: Boolean,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    interests:{
        type: [String]
    }
})

mongoose.model("User",userSchema)