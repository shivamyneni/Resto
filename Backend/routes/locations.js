const express = require("express");
const router = express.Router({ mergeParams: true });

const mongoose = require("mongoose");
const Locations = mongoose.model("Locations");

router.get("/", (req, res) => {
  Locations.find()
    .then((locations) => {
      if (!locations) {
        return res.status(200).json({ 404: "locations not available" });
      }
      console.log(locations);
      return res.send({ locations: locations });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:name", (req, res) => {
  Locations.find({ name: { $regex: req.params.name, $options: "i" } })
    .then((locations) => {
      if (!locations) {
        return res.send("location not available");
      }
      return res.send({ locations: locations });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
