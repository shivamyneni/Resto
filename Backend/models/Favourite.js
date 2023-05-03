const mangoose = require("mongoose");

const favouriteSchema = new mangoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  restaurantname: {
    type: String,
    required: true,
  },
});

mangoose.model("Favourite", favouriteSchema);
