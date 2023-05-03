const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

// Connect Database
const mongoose = require("mongoose");
connectDB();
require("./models/user");
// require("./models/venue")
// require("./models/activity")
require("./models/Restaurants");
require("./models/Locations");
require("./models/Favourite");
require("./models/Ratings");
const stripe = mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});
mongoose.connection.on("error", (err) => {
  console.log("connection error to mongodb", err);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//using json middleware to parse req
app.use(express.json());
//defining routes
app.use("/restaurants", require("./routes/restaurants"));
app.use("/favourite", require("./routes/favourite"));
app.use("/locations", require("./routes/locations"));
app.use("/rating", require("./routes/rating"));
app.use(require("./routes/auth"));
// app.use(require("./routes/password-reset"))
// app.use("/", require("./routes/dashboard"))

// app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
