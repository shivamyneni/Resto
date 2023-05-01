const mangoose = require("mongoose");

const directorSchema = new mangoose.Schema({
  name: {
    type: String,
  },

  DirectedMovies: {
    type: [String],
  },
});

mangoose.model("Directors", directorSchema);
