const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  directorname: {
    type: String,
  },
  posterUrl: {
    type: String,
  },
  ratings: {
    type: [String],
  },
  description: {
    type: String,
  },
  favouriteCount: { type: Number },
  genre: { type: [String] },
});
mongoose.model("Movies", movieSchema);
