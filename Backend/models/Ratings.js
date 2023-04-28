const  mangoose = require('mongoose')

const ratingSchema = new mangoose.Schema({
    movieid:{
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true

    },
    rating:{
        type: Number,
        required: true
    }
})

mangoose.model("Ratings",ratingSchema)
