const mangoose = require('mongoose')

const directorSchema = new mangoose.Schema({
    name:{  
        type: String,
        required: true
    },
    directorid:{
        type: String,
        required: true
    },
    DirectedMovies:{
        type: [String]
    }
})

mangoose.model("Directors",directorSchema)