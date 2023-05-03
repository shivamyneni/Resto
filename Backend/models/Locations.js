const mangoose = require("mongoose");

const locationSchema = new mangoose.Schema({
  name: {
    type: String,
  },

  LocatedRestaurants: {
    type: [String],
  },
});

mangoose.model("Locations", locationSchema);
