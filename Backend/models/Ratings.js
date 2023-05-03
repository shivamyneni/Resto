const mangoose = require("mongoose");

const ratingSchema = new mangoose.Schema({
  restaurantname: {
    type: String,
  },
  ratingid: { type: String },
  userid: {
    type: String,
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: String,
  },
});

mangoose.model("Ratings", ratingSchema);
