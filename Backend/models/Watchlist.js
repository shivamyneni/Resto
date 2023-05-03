const mangoose = require("mongoose");

const watchlistSchema = new mangoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  restaurantname: {
    type: String,
    required: true,
  },
});

mangoose.model("Watchlist", watchlistSchema);
