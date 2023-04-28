const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
   directorid:{
        type: String,
        required: true
   },
   posterUrl:{
    type: String,
    required: true
   },
   ratings:{
    type: [String],
   },
   description:{
    type: String,
   },
   favouriteCount:{type:Number},
   genre:{type:[String]},

})
mongoose.model("Movies",movieSchema)