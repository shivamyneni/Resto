const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db.js');

const app = express();

app.use(cors())

// Connect Database
const mongoose = require('mongoose')
connectDB();
require("./models/user")
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongodb")
})
mongoose.connection.on('error', (err)=>{
    console.log("connection error to mongodb", err)
})

//using json middleware to parse req
app.use(express.json())
//defining routes
app.use(require("./routes/auth"))

// app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));