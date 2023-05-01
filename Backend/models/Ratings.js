const mangoose = require("mongoose");

const ratingSchema = new mangoose.Schema({
  moviename: {
    type: String,
  },
  ratingid: { type: String },
  userid: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

mangoose.model("Ratings", ratingSchema);
