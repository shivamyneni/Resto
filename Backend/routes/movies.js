const express = require('express')
const router = express.Router({mergeParams:true})

const mongoose = require('mongoose')
const Movies = mongoose.model('Movies')


router.get("/getMovies", (req, res)=>{
  
    Movies.find().then((movies)=>{
        if (!movies){
            return res.status(200).json({"404":"movies not available"})
        }
      
        return res.send({movies:movies})
    })
    .catch((err)=>{
        console.log(err)
    }
    )
})



module.exports = router