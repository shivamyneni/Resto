const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
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
  locationname: {
    type: String,
  },
  overallrating: {
    type: Number,
  },
  favouriteCount: { type: Number },
  cuisine: { type: [String] },
});
mongoose.model("Restaurants", restaurantSchema);
